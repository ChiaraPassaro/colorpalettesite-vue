<template>
  <div class="container" id="page-palette">
    <div class="inner content">
      <!--feedback-->
      <FeedbackComponent v-if="$store.state.feedback.status" />
      <!--/feedback-->

      <!--header-->
      <HeaderPalettesComponent />
      <!--/header-->

      <!--main-->
      <main
        :class="['main main--palettes', isActive ? 'page-palette-active' : '']"
      >
        <!--palette description-->
        <section class="palette__description">
          <component
            v-bind:is="component"
            v-on:fill-chart="fillChart"
            v-on:reset-square-colors="resetSquareColors"
          ></component>
          <SlideColors v-bind:type="component"></SlideColors>
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
        <PalettesComponent :activeId="component"></PalettesComponent>
        <!--/palettes list-->
      </main>

      <!--footer-->
      <Footer :footerClass="'--palettes'" />
      <!--/footer-->
    </div>
  </div>
</template>

<script>
import { types } from "@/store/mutations";
import FeedbackComponent from "@/components/FeedbackComponent";
import HeaderPalettesComponent from "@/components/HeaderPalettesComponent";
import Footer from "@/components/FooterComponent";
import PalettesComponent from "@/components/PalettesComponent";
import Chart from "@/components/Chart";
import SlideColors from "@/components/SlideColors";
import Random from "@/components/Random";
import Triad from "@/components/Triad";

export default {
  name: "SinglePalette.vue",
  components: {
    FeedbackComponent,
    Random,
    Triad,
    HeaderPalettesComponent,
    Footer,
    PalettesComponent,
    Chart,
    SlideColors
  },
  data() {
    return {
      component: this.$route.params.type,
      durationAnimation: 2000,
      isActive: false,
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
  beforeMount() {
    this.$store.dispatch({
      type: "setOpenPalette",
      mutation: types.SET_OPEN_PALETTE,
      open: false
    });
  },
  mounted() {
    setTimeout(() => {
      this.isActive = true;
    }, this.durationAnimation);
  },
  methods: {
    fillChart() {
      const degrees = [];
      const colorsLabel = [];

      for (let i = 0; i < 360; i++) {
        degrees.push(1);
        colorsLabel.push("hsl(" + i + ", 50%, 50%, 0.2)");
      }

      for (
        let i = 0;
        i < this.$store.state.palettes[this.component].colors.length;
        i++
      ) {
        const degree = this.$store.state.palettes[this.component].colors[
          i
        ].getHue();
        degrees[degree] = this.$store.state.palettes[this.component].step;
        colorsLabel[degree] = this.$store.state.palettes[this.component].colors[
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

      this.$store.dispatch({
        type: "setOpenPalette",
        mutation: types.SET_OPEN_PALETTE,
        open: true
      });
    },
    resetSquareColors() {
      this.$store.dispatch({
        type: "setNumberStartSquareColors",
        mutation: types.SET_NUMBER_START_SQUARE_COLORS,
        numberStartSquareColors: 0
      });
    }
  },
  created() {},
  beforeRouteUpdate(to, from, next) {
    this.component = to.params.type;
    this.isActive = false;
    if (
      this.$store.state.palettes[this.component] &&
      this.$store.state.palettes[this.component].colors &&
      this.$store.state.palettes[this.component].colors.length > 0
    ) {
      this.fillChart();
    } else {
      this.datacollection = {
        datasets: [
          {
            data: 0,
            backgroundColor: false,
            borderWidth: 0
          }
        ],
        labels: false
      };
    }
    next();
  }
  //todo cambiare pagina completamente
};
</script>
