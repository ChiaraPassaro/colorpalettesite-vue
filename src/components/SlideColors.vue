<template>
  <div
    :class="[
      'palette__description__list-colors',
      isPaletteOpen,
      isPaletteTotalOpen
    ]"
    ref="paletteContainer"
  >
    <div class="arrow arrow--list-colors" @click="setOpen">
      <div class="arrow__inner"></div>
    </div>
    <div class="palette__description__list-colors__actions">
      <button class="btn" :style="{ borderColor: baseColor, color: baseColor }">
        Get your list colors
      </button>
    </div>
    <i
      :class="[
        'fas fa-angle-left palette__description__list__arrow',
        checkNextColors ? 'button-active' : ''
      ]"
      @click="
        moveNext();
        setColorActive(false, false);
      "
      v-if="checkNextColors && open"
    ></i>
    <div class="tooltip" :style="activeColor ? isActiveColor : ''">
      <div class="tooltip--element" :style="activeColor ? backgroundColor : ''">
        <button class="btn" @click="copyColor(activeColor.printHsl())">
          {{ activeColor ? activeColor.printHsl() : "" }}
        </button>
        <button class="btn" @click="copyColor(activeColor.printRgb())">
          {{ activeColor ? activeColor.printRgb() : "" }}
        </button>
        <button class="btn" @click="copyColor(activeColor.printHex())">
          {{ activeColor ? activeColor.printHex() : "" }}
        </button>
      </div>
    </div>
    <ul class="colors-square" ref="colorsSlider">
      <li
        ref="element"
        class="colors-square__item change-opacity"
        v-for="(color, index) in generatedColors"
        v-bind:key="color + index"
        :style="{ backgroundColor: color.printHsl() }"
        @click="open ? setColorActive(color, $refs.element[index]) : ''"
      >
        {{ color.position }}
      </li>
    </ul>
    <i
      :class="[
        'fas fa-angle-right palette__description__list__arrow',
        checkPrevColors ? 'button-active' : ''
      ]"
      @click="
        movePrev();
        setColorActive(false, false);
      "
      v-if="open"
    ></i>
    <div
      aria-hidden="true"
      class="arrow arrow--list-colors-left"
      @click="setOpen"
    >
      <div class="arrow__inner"></div>
    </div>
  </div>
</template>

<script>
//TODO click color open/close and only open slide colors, change button css
import { types } from "@/store/mutations";

export default {
  name: "SlideColors",
  props: ["type"],
  data() {
    return {
      feedback: {
        status: this.$store.state.feedback.status,
        message: this.$store.state.feedback.message
      },
      activeColor: false,
      element: false,
      open: false,
      widthColorsSlider: 0,
      colors: this.$store.state.palettes[this.type].colors,
      numberVisible: 0,
      numberStart: 0,
      baseColor: this.$store.state.cssColor
    };
  },
  computed: {
    generatedColors() {
      const lengthColors = this.$store.state.palettes[this.type].colors
        ? this.$store.state.palettes[this.type].colors.length
        : 0;
      const numberOfElement =
        lengthColors > this.numberVisible ? this.numberVisible : lengthColors;

      if (lengthColors > 0) {
        const colors = this.$store.state.palettes[this.type]
          ? this.$store.state.palettes[this.type].colors.slice(
              this.numberStart,
              this.numberStart + numberOfElement
            )
          : [];
        this.getWidthColorsSlider();
        return colors;
      }

      return false;
    },
    isPaletteOpen() {
      console.log(this.$store.state.palettes.open);
      return this.$store.state.palettes.open
        ? "palette__description__list-colors--active"
        : "";
    },
    isPaletteTotalOpen() {
      return this.open ? "palette__description__list-colors--open" : "";
    },
    checkNextColors() {
      const lengthColors = this.$store.state.palettes[this.type].colors
        ? this.$store.state.palettes[this.type].colors.length
        : 0;
      return this.numberStart + this.numberVisible <= lengthColors;
    },
    checkPrevColors() {
      return this.numberStart - 1 >= 0;
    },
    isActiveColor() {
      const left = this.element.getBoundingClientRect().left;

      return {
        left: `calc(${left}px - ${
          this.$refs.paletteContainer.getBoundingClientRect().left
        }px)`,
        display: "block",
        "--background-color": this.activeColor.printHsl()
      };
    },
    backgroundColor() {
      return { backgroundColor: this.activeColor.printHsl() };
    }
  },
  methods: {
    copyColor(color) {
      if (!navigator.clipboard) {
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.value = color;
        input.select();
        const copied = document.execCommand("copy", false);
        if (copied) {
          this.$store.dispatch({
            type: "setOpenFeedback",
            mutation: types.SET_OPEN_FEEDBACK,
            status: true,
            message: "Copying to clipboard was successful!"
          });

          setTimeout(() => {
            this.$store.dispatch({
              type: "setOpenFeedback",
              mutation: types.SET_OPEN_FEEDBACK,
              status: false,
              message: ""
            });
          }, 2000);
        }
        input.remove();
      } else {
        navigator.clipboard.writeText(color).then(
          () => {
            this.$store.dispatch({
              type: "setOpenFeedback",
              mutation: types.SET_OPEN_FEEDBACK,
              status: true,
              message: "Copying to clipboard was successful!"
            });

            setTimeout(() => {
              this.$store.dispatch({
                type: "setOpenFeedback",
                mutation: types.SET_OPEN_FEEDBACK,
                status: false,
                message: ""
              });
            }, 2000);

            console.log("Copying to clipboard was successful!");
          },
          err => {
            this.$store.dispatch({
              type: "setOpenFeedback",
              mutation: types.SET_OPEN_FEEDBACK,
              status: true,
              message: `Could not copy text: ${err}`
            });

            setTimeout(() => {
              this.$store.dispatch({
                type: "setOpenFeedback",
                mutation: types.SET_OPEN_FEEDBACK,
                status: false,
                message: ""
              });
            }, 2000);

            console.error("Could not copy text: ", err);
          }
        );
      }
    },
    setColorActive(color, element) {
      this.element = element;
      this.activeColor = color;
    },
    setOpen() {
      this.open = !this.open;
      this.getWidthColorsSlider();
    },
    getWidthColorsSlider() {
      setTimeout(() => {
        this.widthColorsSlider = this.$refs.colorsSlider.clientWidth;
        this.numberVisible = Math.ceil(this.widthColorsSlider / 65);
      }, 1000);
    },
    moveNext() {
      this.numberStart = this.numberStart + 1;
    },
    movePrev() {
      if (this.numberStart - 1 >= 0) {
        this.numberStart = this.numberStart - 1;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 0;
  display: none;
  width: 60px;
  height: 250px;
  filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, 0.5));
  &--element {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    height: 100%;
    padding: 10px;
    border: 3px solid white;
    border-radius: 5px;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    z-index: -1;
    width: 25px;
    height: 25px;
    border: 3px solid white;
    border-radius: 2px;
    background-color: var(--background-color);
    transform: translateX(-50%) rotate(45deg);
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 16px;
    height: 5px;
    background-color: var(--background-color);
    transform: translateX(-50%);
  }
  .btn {
    border: 0;
    width: 80%;
  }
}
</style>
