<template lang="html">
  <div class="chart-container">
    <LineGraph :data="chartData" :options="chartOptions" />
  </div>
</template>

<script scoped lang="ts">
import { Line as LineGraph } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import trendData from '@/assets/trend-data.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'TrendChart',
  components: { LineGraph },
  data() {
    return {
      chartData: trendData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Trend Analysis',
          },
        },
      },
    }
  },
}
</script>

<style scoped lang="scss">
.chart-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 10px;
}
</style>
