<template>
  <div class="palette__description__info">
    <h2>Complementar</h2>
    <p>
      You can choose how many colors you want in a fan of 140 ° with center in
      the complementary color
    </p>
    <div id="palette__description__form">
      <div class="row">
        <div class="input-group">
          <input
            id="number_color"
            max="360"
            min="0"
            name="number_color"
            placeholder="Insert an even number 0-360"
            tabindex="1"
            type="number"
            v-model="number"
            :class="!!error.number.length ? 'error' : ''"
            @keyup="checkValue"
          />
          <label for="number_color">Number colors: </label>
          <span class="error" v-if="error.number">{{ error.number }}</span>
        </div>
      </div>

      <div class="row">
        <div class="input-group">
          <input
            id="step"
            max="140"
            min="0"
            name="step"
            placeholder="Insert a number"
            tabindex="2"
            type="number"
            v-model="step"
            :class="!!error.step.length ? 'error' : ''"
            @keyup="checkValue"
            @keydown.enter="setValues"
          />
          <label for="step">Step: </label>
          <span class="error" v-if="error.step">{{ error.step }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { types } from "@/store/mutations";
import { mapGetters } from "vuex";

export default {
  name: "Complementary",
  data() {
    return {
      type: "complementary",
      error: {
        step: false,
        number: false
      }
    };
  },
  computed: {
    colors() {
      return this.$store.getters.getColors(this.$route.params.type);
    },
    palette() {
      return this.$store.getters.getPalette(this.$route.params.type);
    },
    number() {
      return this.$store.getters.getNumber(this.$route.params.type);
    },
    step() {
      return this.$store.getters.getStep(this.$route.params.type);
    },
    checkError() {
      return (
        !!this.error.number.length ||
        !!this.error.step.length ||
        !this.step ||
        !this.number
      );
    },
    buttonColor() {
      return { backgroundColor: this.$store.state.color.printHsl() };
    },
    ...mapGetters(["ColorPaletteObject", "basecolor", "PaletteObject"])
  },
  methods: {
    setValues() {
      this.$emit("reset-square-colors");
      const step = parseFloat(this.step);
      const number = parseInt(this.number);
      const isInRangeDegree = !isNaN(step) && step > 0 && number * step <= 140;
      const isInRangeNumber =
        !isNaN(number) && number > 0 && number <= 360 && number % 2 === 0;
      if (isInRangeNumber && isInRangeDegree) {
        this.$store.dispatch({
          type: "setComplementarData",
          mutation: types.SET_COMPLEMENTAR_DATA,
          step,
          number
        });
        this.generatePalette();
      }
    },
    checkValue() {
      const step = parseFloat(this.step);
      const number = parseInt(this.number);
      const isInRangeDegree = !isNaN(step) && step > 0 && number * step <= 140;
      const isInRangeNumber = !isNaN(number) && number > 0 && number <= 360;
      const isEven = number % 2 === 0;
      this.error.number = !isInRangeNumber
        ? "is out of range"
        : !isEven
        ? "is odd"
        : false;
      this.error.step = !isInRangeDegree ? "is out of range" : false;
    },
    generatePalette() {
      const complementary = this.PaletteObject.complementar(
        parseInt(this.number),
        parseFloat(this.step)
      );

      complementary.unshift(this.$store.state.color);

      complementary.forEach((element, index) => {
        element.position = index + 1;
      });

      this.$store
        .dispatch({
          type: "setComplementarPalette",
          mutation: types.SET_COMPLEMENTAR_PALETTE,
          colors: complementary
        })
        .then(() => {
          this.$emit("fill-chart");
        });
    }
  }
};
</script>
