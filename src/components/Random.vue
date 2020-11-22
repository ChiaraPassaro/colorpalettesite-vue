<template>
  <div class="palette__description__info">
    <h2>Random Dominant</h2>
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
            placeholder="Insert a number 0-360"
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
            id="percDominant"
            max="100"
            min="0"
            name="percDominant"
            placeholder="Insert a number 0-100"
            tabindex="2"
            type="number"
            v-model="percDominant"
            :class="!!error.percDominant.length ? 'error' : ''"
            @keyup="checkValue"
            @keydown.enter="setValues"
          />
          <label for="percDominant">Dominant percentage: </label>
          <span class="error" v-if="error.percDominant">{{
            error.percDominant
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { types } from "@/store/mutations";

export default {
  name: "Random",
  data() {
    return {
      type: "random",
      colors: this.$store.state.palettes[this.type]
        ? this.$store.state.palettes[this.type].colors
        : [],
      step: 360,
      stepGenerated: undefined,
      number: this.$store.state.palettes.random.number,
      percDominant: this.$store.state.palettes.random.percDominant,
      error: {
        percDominant: false,
        number: false
      },
      palette: this.$store.state.palettes.palette
    };
  },
  computed: {
    checkError() {
      return (
        !!this.error.number.length ||
        !!this.error.percDominant.length ||
        !this.percDominant ||
        !this.number
      );
    },
    buttonColor() {
      return { backgroundColor: this.$store.state.color.printHsl() };
    }
  },
  methods: {
    setValues() {
      this.$emit("reset-square-colors");

      const percDominant = parseInt(this.percDominant);
      const number = parseInt(this.number);
      const isInRangeDegree =
        !isNaN(percDominant) && percDominant > 0 && percDominant <= 100;
      const isInRangeNumber = !isNaN(number) && number > 0 && number <= 360;

      if (isInRangeNumber && isInRangeDegree) {
        this.$store.dispatch({
          type: "setRandomData",
          mutation: types.SET_RANDOM_DATA,
          percDominant,
          number
        });
        this.generatePalette();
      }
    },
    checkValue() {
      const percDominant = parseInt(this.percDominant);
      const number = parseInt(this.number);
      const isInRangeDegree =
        !isNaN(percDominant) && percDominant > 0 && percDominant <= 100;
      const isInRangeNumber = !isNaN(number) && number > 0 && number <= 360;
      this.error.number = !isInRangeNumber ? "is out of range" : false;
      this.error.percDominant = !isInRangeDegree ? "is out of range" : false;
    },
    generatePalette() {
      const randomDominant = this.palette.randomDominant(
        this.number,
        this.percDominant
      );

      randomDominant.forEach((element, index) => {
        element.position = index + 1;
      });

      this.stepGenerated = this.step / randomDominant.length;

      this.$store.dispatch({
        type: "setRandomPalette",
        mutation: types.SET_RANDOM_PALETTE,
        colors: randomDominant,
        step: this.stepGenerated
      });

      this.$emit("fill-chart");
    }
  }
};
</script>
