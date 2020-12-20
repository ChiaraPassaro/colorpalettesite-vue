<template>
  <div class="palette__description__info">
    <h2>Analogous</h2>
    <p>
      <!--      Crea Analogous palettes:-->
      <!--      palettes.analogous(typeScheme, numColor, stepDegree)-->
      <!--      Arguments:-->
      <!--      Scheme Type: 'allArch', 'cold', 'warm'-->
      <!--      Colors number - even-->
      <!--      Step degree between colors-->
      <!--      Max degree numColor*step = 60-->
      <!--     Return:-->

      You can choose how many colors you want
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
          <select
            name="type_scheme"
            id="type_scheme"
            tabindex="2"
            v-model="typeScheme"
          >
            <option
              v-for="(scheme, index) in schemes"
              :value="scheme"
              :key="index"
              >{{ scheme }}</option
            >
          </select>

          <label for="type_scheme">Type of Scheme: </label>
          <span class="error" v-if="error.typeScheme">{{
            error.typeScheme
          }}</span>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <input
            id="step"
            min="0"
            name="step"
            placeholder="Insert a number"
            tabindex="2"
            type="number"
            v-model="step"
            :class="!!error.step.length ? 'error' : ''"
            @keyup="checkValue"
          />
          <label for="step">Step: </label>
          <span class="error" v-if="error.step">{{ error.step }}</span>
        </div>
      </div>
      <div class="row">
        <button
          @click="setValues"
          :class="['button', checkError ? '' : 'active']"
          type="submit"
          :disabled="checkError"
          :style="buttonColor"
        >
          Generate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//TODO add style select

import { types } from "@/store/mutations";
import { mapGetters } from "vuex";

export default {
  name: "Analogous",
  data() {
    return {
      type: "analogous",
      error: {
        step: false,
        number: false,
        typeScheme: false
      },
      schemes: ["allArch", "warm", "cold"]
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
          type: "setDataPalettes",
          mutation: types.SET_DATA_PALETTES,
          data: {
            name: "number",
            value: number,
            type: this.type
          }
        });
      }
    },
    typeScheme: {
      get() {
        return this.$store.getters.getTypeScheme(this.$route.params.type);
      },
      set(schema) {
        this.$store.dispatch({
          type: "setDataPalettes",
          mutation: types.SET_DATA_PALETTES,
          data: {
            name: "typeScheme",
            value: schema,
            type: this.type
          }
        });
      }
    },
    step: {
      get() {
        return this.$store.getters.getStep(this.$route.params.type);
      },
      set(step) {
        this.$store.dispatch({
          type: "setDataPalettes",
          mutation: types.SET_DATA_PALETTES,
          data: {
            name: "step",
            value: step,
            type: this.type
          }
        });
      }
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
      const isInRangeDegree = !isNaN(step) && step > 0 && number * step <= 60;
      const isInRangeNumber =
        !isNaN(number) && number > 0 && number <= 360 && number % 2 === 0;
      if (isInRangeNumber && isInRangeDegree) {
        this.generatePalette();
      }
    },
    checkValue() {
      const step = parseFloat(this.step);
      const number = parseInt(this.number);
      const isInRangeDegree = !isNaN(step) && step > 0 && number * step <= 60;
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
      const analogous = this.PaletteObject.analogous(
        this.typeScheme,
        parseInt(this.number),
        parseFloat(this.step)
      );

      analogous.forEach((element, index) => {
        element.position = index + 1;
      });

      this.$store
        .dispatch({
          type: "setAnalogousPalette",
          mutation: types.SET_ANALOGOUS_PALETTE,
          colors: analogous
        })
        .then(() => {
          this.$emit("fill-chart");
        });
    }
  },
  mounted() {
    if (Object.keys(this.colors).length > 0) {
      this.generatePalette();
    }
  }
};
</script>

<style lang="scss"></style>
