<template>
  <div class="home">
    <h1>Trend Analysis</h1>
    <div class="chart-wrapper">
      <TrendChart />
    </div>
  </div>
</template>

<script scoped lang="ts">
import TrendChart from '@/components/TrendChart.vue'

export default {
  name: 'HomePage',
  components: {
    TrendChart,
  },
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  background: #f8f9fa;
}

.chart-wrapper {
  max-width: 100%;
  width: 100%;
  height: calc(100vh - 100px);
  margin: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

h1 {
  text-align: center;
  margin: 0 0 20px 0;
  padding: 10px 0;
  color: #333;
}
</style>
