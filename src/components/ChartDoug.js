import { Doughnut } from 'vue-chartjs';

const degrees = [];
const colorsLabel = [];

for (let i = 0; i < 360; i++) {
  degrees.push(1);
  colorsLabel.push(`hsl(${i}, 100%, 40%)`);
}

export default {
  extends: Doughnut,
  data: () => ({
    chartdata: {
      datasets: [
        {
          data: degrees,
          backgroundColor: colorsLabel,
          borderWidth: 0,
        }
      ],
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
  }
}
