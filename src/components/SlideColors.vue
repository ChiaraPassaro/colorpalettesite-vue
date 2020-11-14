<template>
  <div
    :class="[
      'palette__description__list-colors',
      isPaletteOpen,
      isPaletteTotalOpen
    ]"
    ref="paletteContainer"
  >
    <div
      class="arrow arrow--list-colors"
      :style="setBackgroundColorArrow"
      @click="setOpen"
    >
      <div class="arrow__inner"></div>
    </div>
    <div class="palette__description__list-colors__actions">
      <button
        class="btn"
        :style="{
          color: `hsl(${baseColor.getHue()}, ${baseColor.getSaturation()}%, 30%)`
        }"
      >
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
    <ul class="colors-square" ref="colorsSlider">
      <li
        ref="element"
        class="colors-square__item change-opacity"
        v-for="(color, index) in generatedColors"
        v-bind:key="color + index"
        :style="{ backgroundColor: color.printHsl() }"
        @mouseover="open ? setColorActive(color, $refs.element[index]) : ''"
        @mouseleave="open ? setColorActive(false, false) : ''"
      >
        <div class="colors-square__item__position">{{ color.position }}</div>
        <div
          :class="['colors-square__item__content', activeColor ? 'active' : '']"
        >
          <button
            class="btn"
            @click="copyColor(activeColor.printHsl(), 'hsl')"
            :style="messageCopy.hsl ? getComplementarColor : ''"
          >
            {{ messageCopy.hsl ? messageCopy.hsl : activeColor ? "HSL" : "" }}
          </button>
          <button
            class="btn"
            @click="copyColor(activeColor.printRgb(), 'rgb')"
            :style="messageCopy.rgb ? getComplementarColor : ''"
          >
            {{ messageCopy.rgb ? messageCopy.rgb : activeColor ? "RGB" : "" }}
          </button>
          <button
            class="btn"
            @click="copyColor(activeColor.printHex(), 'hex')"
            :style="messageCopy.hex ? getComplementarColor : ''"
          >
            {{ messageCopy.hex ? messageCopy.hex : activeColor ? "HEX" : "" }}
          </button>
        </div>
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
      :style="setBackgroundColorArrow"
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
      messageCopy: {
        hex: false,
        rgb: false,
        hsl: false
      },
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
      baseColor: this.$store.state.color
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
    setBackgroundColorArrow() {
      return {
        "--background-color": this.baseColor.printHsl()
      };
    },
    backgroundColor() {
      return { backgroundColor: this.activeColor.printHsl() };
    },
    getComplementarColor() {
      const complementar = this.$store.state.ColorPalettesRange.SetColorPalette(
        this.activeColor
      ).complementar(2, 1)[2];

      const textColor =
        this.contrastRatio(complementar.getBrightness() / 100, 10) >
        this.contrastRatio(complementar.getBrightness() / 100, 0)
          ? "white"
          : "black";

      return {
        backgroundColor: complementar.printHsl(),
        "--button-color": textColor
      };
    }
  },
  methods: {
    setColorActive(color, element) {
      this.element = element;
      this.activeColor = color;
    },
    setOpen() {
      this.open = !this.open;
      this.getWidthColorsSlider();
    },
    getWidthColorsSlider() {
      this.numberVisible = 0;
      setTimeout(() => {
        this.widthColorsSlider = this.$refs.colorsSlider.clientWidth;
        this.numberVisible = Math.ceil(this.widthColorsSlider / 65);
      }, 500);
    },
    moveNext() {
      this.numberStart = this.numberStart + 1;
    },
    movePrev() {
      if (this.numberStart - 1 >= 0) {
        this.numberStart = this.numberStart - 1;
      }
    },
    copyColor(color, type) {
      if (!navigator.clipboard) {
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.value = color;
        input.select();
        const copied = document.execCommand("copy", false);
        if (copied) {
          this.messageCopy[type] = "Copied!";
          setTimeout(() => {
            this.messageCopy[type] = false;
          }, 300);
        } else {
          this.$store.dispatch({
            type: "setOpenFeedback",
            mutation: types.SET_OPEN_FEEDBACK,
            status: true,
            message: `Could not copy text`
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
            this.messageCopy[type] = "Copied!";
            setTimeout(() => {
              this.messageCopy[type] = false;
            }, 300);
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
    contrastRatio(brightness1, brightness2) {
      return (
        (Math.max(brightness1, brightness2) + 0.05) /
        (Math.min(brightness1, brightness2) + 0.05)
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/partials/_variables";
@import "../scss/partials/_mixin";

.tooltip {
  position: absolute;
  z-index: 4;
  bottom: 85%;
  left: 0;
  display: none;
  width: 60px;
  height: 150px;
  font-size: 80%;
  &--element {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 100%;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    &--content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      &:before {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        z-index: -1;
        width: 55px;
        height: 55px;
        border-radius: 2px;
        background-color: var(--background-color);
        transform: translateX(-50%) rotate(45deg);
      }
    }
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    z-index: -1;
    width: 65px;
    height: 65px;
    border-radius: 2px;
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.7);
    background-color: var(--background-color);
    transform: translateX(-50%) rotate(45deg);
  }
}
.btn {
  border: 1px transparent;
  background: white;
  font-weight: bold;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.6);
  transition: all 0.5s;
  &:hover,
  &:active,
  &:focus {
    filter: none;
    box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.7);
  }
}
.palette__description {
  &__list-colors {
    position: absolute;
    bottom: 10%;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 40%;
    height: 110px;
    padding-right: 20px;
    margin-left: calc(-40% - 75px);
    background: $mainColor;
    transition: all 0.5s;

    &--active {
      position: absolute;
      left: 0;
      z-index: 1;
      width: 40%;
      margin-left: 0;
      padding-left: 2%;
    }
    &__actions {
      opacity: 0;
      width: 30%;
      font-size: 0;
      transition: opacity 1s;
    }
    &--open {
      width: 90%;
      left: 10%;

      .palette__description__list-colors__actions {
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        margin: 5px 0;
        font-size: 100%;
      }
      .arrow--list-colors-left {
        animation-name: z-indexChange;
        animation-delay: 1s;
        animation-duration: #{$animationDelayBase}s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
      .colors-square {
        width: 80%;
        &__item {
          &:hover {
            box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.7);
            width: 50%;

            .colors-square__item__position {
              display: none;
            }

            .colors-square__item__content.active {
              display: flex;
              .btn {
                @include animationFadeIn(buttons, 0, 1);
                animation-delay: 0.5s;
              }
            }
          }
        }
      }
    }
    &--close {
      margin-left: 0;
      animation-name: listColorsOpen;
      animation-delay: 1s;
      animation-duration: #{$animationDelayBase}s;
      animation-iteration-count: 1;
      animation-fill-mode: backwards;
      animation-direction: reverse;
    }
  }
  .colors-square {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 10px 10px 10px 15px;
    margin-left: 10px;
    list-style-type: none;
    color: white;
    &__item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 1;
      width: 60px;
      height: 60px;
      padding: 10px;
      margin-right: 5px;
      box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.6);
      opacity: 0;
      cursor: pointer;
      transition: all 1s;
      &__content {
        display: none;
        justify-content: space-around;
        align-items: stretch;
        width: 100%;
        height: 80%;
        .btn {
          flex-basis: calc(100% / 3 - 10px);
          opacity: 0;
          border: 1px transparent;
          box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.6);
          background: white;
          font-size: 90%;
          font-weight: bold;
          transition: all 0.5s;
          &:hover,
          &:active,
          &:focus {
            filter: none;
            box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.7);
          }
        }
      }
      &.change-opacity {
        opacity: 1;
      }
    }
  }
  &__list__arrow {
    font-size: 60px;
    color: $lightGrey;
  }
}
.arrow {
  &--list-colors {
    top: 50%;
    left: calc(100% - 22px);
    transform: translateY(-50%) rotate(90deg);
    cursor: pointer;

    .arrow__inner {
      &:before {
        background-color: var(--background-color);
      }
    }
    &:after {
      background-color: var(--background-color);
      height: 28px;
    }
  }
  &--list-colors-left {
    z-index: -1;
    top: 50%;
    left: -79px;
    transform: translateY(-50%) rotate(270deg);
    cursor: pointer;
    .arrow__inner {
      &:before {
        background-color: var(--background-color);
      }
    }
    &:after {
      background-color: var(--background-color);
      height: 28px;
    }
  }
}
</style>
