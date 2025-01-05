<template lang="html">
  <div class="chart-container">
    <LineChart :data="chartData" :options="options" />
  </div>
</template>

<script scoped lang="ts">
import { Line as LineChart } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'TrendChart',
  components: { LineChart },
  data() {
    return chartConfig
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
