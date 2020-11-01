import { Doughnut } from "vue-chartjs";

const degrees = [];
const colorsLabel = [];

for (let i = 0; i < 360; i++) {
  degrees.push(1);
  colorsLabel.push(`hsl(${i}, 100%, 40%)`);
}

export default {
  props: ['type'],
  extends: Doughnut,
  data: () => ({
    palette: this.$store.state.palettes[this.type].colors,
    step: this.$store.state.palettes[this.type].step,
    chartdata: {
      datasets: [{
        data: degrees,
        backgroundColor: colorsLabel,
        borderWidth: 0
      }],
      labels: colorsLabel
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        display: false
      }
    }
  }),
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  methods: {
    getChart() {
      const degrees = [];
      const colorsLabel = [];

      for (let i = 0; i < 360; i++) {
        //tutti i gradi hanno valore 1 per comparire nella chart
        degrees.push(1);
        //tutti i gradi hanno il colore di background ad opacità 0.2
        colorsLabel.push('hsl('+ i + ', 50%, 50%, 0.2)');
      }

      //inserisco i gradi della palette con dato uguale allo step usato per generare la palette
      for (let i = 0; i < this.palette.length; i++) {
        const degree = this.palette[i].getHue();
        degrees[degree] = this.step;
        colorsLabel[degree] = this.palette[i].printHsl();
      }
      this.chartdata.datasets[0] = {
        data: degrees,
        backgroundColor: colorsLabel,
        borderWidth: 0
      };
      this.chartdata.labels = colorsLabel;
    }
  }
}