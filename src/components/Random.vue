<template>
  <main :class="['main main--palettes', isActive ? 'page-palette-active' : '']">
    <!--palette description-->
    <section class="palette__description">
      <div class="palette__description__info">
        <h2>Random Dominant</h2>
        <p>
          You can choose how many colors you want in a fan of 140 ° with center
          in the complementary color
        </p>
        <form
          @submit.prevent="setValues"
          id="palette__description__form"
          action=""
        >
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
              />
              <label for="percDominant">Dominant percentage: </label>
              <span class="error" v-if="error.percDominant">{{
                error.percDominant
              }}</span>
            </div>
          </div>
          <div class="row">
            <button
              :class="['button', checkError ? '' : 'active']"
              type="submit"
              :disabled="checkError"
              :style="buttonColor"
            >
              Generate
            </button>
          </div>
        </form>
      </div>

      <SlideColors v-bind:type="type"></SlideColors>
    </section>
    <!--/palette description-->

    <!--palette detail-->
    <section class="palette__detail">
      <div>
        <Chart
          v-bind:options="options"
          v-bind:chart-data="datacollection"
        ></Chart>
      </div>
    </section>
    <!--/palette detail-->

    <!--palettes list-->
    <PalettesComponent :activeId="type"></PalettesComponent>
    <!--/palettes list-->
  </main>
</template>

<script>
import { types } from "@/store/mutations";
import PalettesComponent from "@/components/PalettesComponent";
import Chart from "@/components/Chart";
import SlideColors from "@/components/SlideColors";

export default {
  name: "Random",
  components: {
    PalettesComponent,
    Chart,
    SlideColors
  },
  data() {
    return {
      type: "random",
      durationAnimation: 2000,
      isActive: false,
      colors: this.$store.state.palettes[this.type]
        ? this.$store.state.palettes[this.type].colors
        : [],
      step: 360,
      stepGenerated: undefined,
      number: this.$store.state.palettes.random.number,
      numberStart: this.$store.state.palettes.numberStartSquareColors,
      percDominant: this.$store.state.palettes.random.percDominant,
      error: {
        percDominant: false,
        number: false
      },
      palette: this.$store.state.palettes.palette,
      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: true
        },
        legend: {
          display: false
        }
      }
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
      this.$store.dispatch({
        type: "setNumberStartSquareColors",
        mutation: types.SET_NUMBER_START_SQUARE_COLORS,
        numberStartSquareColors: 0
      });
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

      this.fillChart();
      this.$store.dispatch({
        type: "setOpenPalette",
        mutation: types.SET_OPEN_PALETTE,
        open: true
      });
    },
    fillChart() {
      const degrees = [];
      const colorsLabel = [];

      for (let i = 0; i < 360; i++) {
        degrees.push(1);
        colorsLabel.push("hsl(" + i + ", 50%, 50%, 0.2)");
      }

      for (
        let i = 0;
        i < this.$store.state.palettes.random.colors.length;
        i++
      ) {
        const degree = this.$store.state.palettes.random.colors[i].getHue();
        degrees[degree] = this.stepGenerated;
        colorsLabel[degree] = this.$store.state.palettes.random.colors[
          i
        ].printHsl();
      }

      this.datacollection = {
        datasets: [
          {
            data: degrees,
            backgroundColor: colorsLabel,
            borderWidth: 0
          }
        ],
        labels: colorsLabel
      };
    }
  },
  mounted() {
    setTimeout(() => {
      this.isActive = true;
    }, this.durationAnimation);
  }
};
</script>
