<template>
  <div
    :class="[
      'palette__description__list-colors',
      isPaletteOpen,
      isPaletteTotalOpen
    ]"
  >
    <div class="arrow arrow--list-colors" @click="setOpen">
      <div class="arrow__inner"></div>
    </div>
    <div class="palette__description__list-colors__actions">
      <button class="btn" :style="{borderColor: baseColor, color: baseColor}">
            Get your list colors
      </button>
    </div>
    <i
      :class="[
        'fas fa-angle-left palette__description__list__arrow-left',
        checkNextColors ? 'button-active' : ''
      ]"
      @click="moveNext"
      v-if="checkNextColors && open"
    ></i>
    <ul class="colors-square" ref="colorsSlider">
      <li
        class="colors-square__item change-opacity"
        v-for="(color, index) in generatedColors"
        v-bind:key="color + index"
        :style="{ backgroundColor: color.printHsl() }"
      >
        {{ color.position }}
        <span @click="copyColor(color)">{{ color.printHsl() }}</span>
      </li>
    </ul>
    <i
      :class="[
        'fas fa-angle-right palette__description__list__arrow-left',
        checkPrevColors ? 'button-active' : ''
      ]"
      @click="movePrev"
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
export default {
  name: "SlideColors",
  props: ["type"],
  data() {
    return {
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
      const lengthColors = this.$store.state.palettes[this.type].colors ? this.$store.state.palettes[this.type].colors.length : 0;
      const numberOfElement = lengthColors > this.numberVisible ? this.numberVisible : lengthColors;

      if(lengthColors > 0) {
        const colors = (this.$store.state.palettes[this.type]) ? this.$store.state.palettes[this.type].colors.slice(this.numberStart, this.numberStart + numberOfElement) : [];
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
      const lengthColors = (this.$store.state.palettes[this.type].colors) ? this.$store.state.palettes[this.type].colors.length : 0;
      return this.numberStart + this.numberVisible <= lengthColors;
    },
    checkPrevColors() {
      return this.numberStart - 1 >= 0;
    }
  },
  methods: {
    copyColor(color) {
      console.log(color.printHsl());
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
      if(this.numberStart - 1 >= 0) {
        this.numberStart = this.numberStart - 1;
      }
    }
  }
};
</script>


<style scoped lang="scss">
@import "../scss/partials/_variables.scss";

.palette__description__list__arrow-left {
  font-size: 60px;
  color: $lightGrey;
}
.button-active {
  cursor: pointer;
  color: $grey;
}
</style>
