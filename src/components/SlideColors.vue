<template>
  <div
    :class="[
      'palette__description__list-colors',
      isPaletteOpen,
      isPaletteTotalOpen
    ]"
  >
    <div aria-hidden="true" class="arrow arrow--list-colors" @click="setOpen">
      <div class="arrow__inner"></div>
    </div>
    <div class="palette__description__list-colors__actions">
      <p>
        Click on square and copy hsl code <br />
        or <br />
        <button>Get your list colors</button>
      </p>
    </div>
    <!--TODO devono rimanere quadrati, aggiungere slide e si deve aprire solo quando sono generati i colori-->
   <i class="fas fa-angle-left palette__description__list__arrow-left" @click="moveNext" v-if="checkNextColors"></i>
    <ul class="colors-square" ref="colorsSlider">
      <li
        class="colors-square__item"
        v-for="(color, index) in generatedColors"
        v-bind:key="color + index"
        :style="{ backgroundColor: color.printHsl() }"
      >
        <span @click="copyColor(color)">{{ color.printHsl() }}</span>
      </li>
    </ul>
    <i class="fas fa-angle-right palette__description__list__arrow-left" @click="movePrev" v-if="checkPrevColors"></i>
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
      numberVisible: 5,
      numberStart: 0
    };
  },
  computed: {
    generatedColors() {
      const numberOfElement =
          this.$store.state.palettes[this.type] &&
          this.$store.state.palettes[this.type].colors.length > this.numberVisible
              ? this.numberVisible
              : this.$store.state.palettes[this.type].colors.length;

      const colors = (this.$store.state.palettes[this.type]) ? this.$store.state.palettes[this.type].colors.slice(this.numberStart, this.numberStart + numberOfElement) : [];

      return colors;
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
      return this.numberStart + this.numberVisible <= this.$store.state.palettes[this.type].colors.length;
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
        this.numberVisible = parseInt(this.widthColorsSlider / 60);
      }, 1000);
    },
    moveNext() {
      this.numberStart = this.numberStart + 1;
    },
    movePrev() {
      this.numberStart = this.numberStart - 1;
    }
  }
};
</script>


<style scoped lang="scss">
@import "../scss/partials/_variables.scss";

.palette__description__list__arrow-left {
  font-size: 60px;
  color: $grey;
}
</style>
