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
import { mapGetters } from "vuex";

export default {
  name: "Random",
  data() {
    return {
      type: "random",
      error: {
        percDominant: false,
        number: false
      },
      stepGenerated: undefined
    };
  },
  computed: {
    colors() {
      return this.$store.getters.getColors(this.$route.params.type);
    },
    palette() {
      return this.$store.getters.getPalette(this.$route.params.type);
    },
    number: {
      get() {
        return this.$store.getters.getNumber(this.$route.params.type);
      },
      set(number) {
        this.$store.dispatch({
          type: "setRandomNumber",
          mutation: types.SET_RANDOM_NUMBER,
          number
        });
      }
    },
    step: {
      get() {
        return this.$store.getters.getStep(this.$route.params.type);
      },
      set(step) {
        this.$store.dispatch({
          type: "setRandomStep",
          mutation: types.SET_RANDOM_STEP,
          step
        });
      }
    },
    percDominant: {
      get() {
        return this.$store.getters.getPercDominant(this.$route.params.type);
      },
      set(percDominant) {
        this.$store.dispatch({
          type: "setRandomPercDominant",
          mutation: types.SET_RANDOM_PERCDOMINANT,
          percDominant
        });
      }
    },
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
    },

    ...mapGetters(["ColorPaletteObject", "basecolor", "PaletteObject"])
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
      const randomDominant = this.PaletteObject.randomDominant(
        this.number,
        this.percDominant
      );

      randomDominant.forEach((element, index) => {
        element.position = index + 1;
      });

      this.stepGenerated = this.number / randomDominant.length;

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
