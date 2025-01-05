<template lang="html">
  <div class="chart-container">
    <div class="filters">
      <div class="filter-group">
        <label for="year">Year:</label>
        <select id="year" v-model="selectedYear">
          <option value="">All Years</option>
          <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="month">Month:</label>
        <select id="month" v-model="selectedMonth">
          <option value="">All Months</option>
          <option v-for="(month, index) in months" :key="index" :value="index + 1">
            {{ month }}
          </option>
        </select>
      </div>
    </div>
    <LineChart :data="chartFilteredData" :options="options" />
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
    return {
      ...chartConfig,
      selectedYear: '',
      selectedMonth: '',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
  },

  computed: {
    chartFilteredData() {
      return chartConfig.getChartData(this.selectedYear, this.selectedMonth)
    },
  },
}
</script>

<style scoped lang="scss">
.chart-container {
  height: 95%;
  width: 100%;
  margin: 0;
  padding: 10px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;

  label {
    font-weight: 500;
    color: #333;
  }

  select {
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #2196f3;
    }
  }
}
</style>
