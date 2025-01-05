<template lang="html">
  <div class="chart-container">
    <div class="today-price">
      <div class="price-card">
        <h3>Today's Gold Price</h3>
        <div class="price">{{ getFormattedPrice() }}</div>
        <div class="date">{{ latestData.Date_AD }}</div>
      </div>
    </div>

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
    <div class="chart-wrapper">
      <LineChart :data="chartFilteredData" :options="options" />
      <div class="chart-footer">
        <p>
          Source:
          <a
            href="https://gahanaonline.com/gold-rate-history/"
            target="_blank"
            rel="noopener noreferrer"
            >Gahana Online</a
          >
        </p>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date (AD)</th>
            <th>Date (BS)</th>
            <th>Gold Price (NPR)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tableFilteredData.length === 0">
            <td colspan="3" style="text-align: center">No data found</td>
          </tr>
          <tr v-for="(data, index) in tableFilteredData" :key="index">
            <td>{{ data.Date_AD }}</td>
            <td>{{ data.Date_BS }}</td>
            <td class="price">{{ formatPrice(Number(data.Gold_Price_Per_Tola)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#8B7355',
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: '#f0e6cc',
            },
            ticks: {
              color: '#8B7355',
            },
          },
          y: {
            grid: {
              color: '#f0e6cc',
            },
            ticks: {
              color: '#8B7355',
            },
          },
        },
      },
    }
  },

  computed: {
    chartFilteredData() {
      const data = chartConfig.getChartData(this.selectedYear, this.selectedMonth)
      data.datasets = data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#B8860B',
        pointBorderColor: '#FFD700',
        tension: 0.4,
      }))
      return data
    },

    tableFilteredData() {
      return chartConfig.getTableData(this.selectedYear, this.selectedMonth)
    },
  },
  methods: {
    getFormattedPrice() {
      const price = this.latestData.Gold_Price_Per_Tola
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NPR',
      }).format(Number(price))
    },
    formatPrice(price: number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NPR',
      }).format(price)
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

.chart-wrapper {
  max-width: 100%;
  width: 100%;
  height: calc(100vh - 400px);
  margin: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
}

.chart-footer {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 0.8rem;
  color: #666;

  a {
    color: #d4af37;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #b8860b;
      text-decoration: underline;
    }
  }
}

.today-price {
  margin-bottom: 20px;
}

.price-card {
  background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .price {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .date {
    font-size: 0.9rem;
    opacity: 0.9;
  }
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

.table-wrapper {
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f8f8;
    color: #333;
    font-weight: 600;
  }

  td {
    color: #666;

    &.price {
      color: #d4af37;
      font-weight: 500;
    }
  }

  tr:hover {
    background: #fafafa;
  }
}

@media (max-width: 768px) {
  .table-wrapper {
    margin-top: 15px;
    padding: 10px;
  }

  table {
    font-size: 0.8rem;

    th,
    td {
      padding: 8px;
    }
  }
}
</style>
