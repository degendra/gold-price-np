import jsonData from '../assets/trend-data.json';

const sortedData = jsonData.sort((a, b) => { return new Date(a.Date_AD).getTime() - new Date(b.Date_AD).getTime(); });

export const uniqueYears = [...new Set(sortedData.map((item) => new Date(item.Date_AD).getFullYear()))].filter((item) => !isNaN(item)).sort((a, b) => b - a);

interface ChartJSData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
    fill: boolean;
    pointRadius: number;
  }>;
}

interface TableData {
  Date_AD: string;
  Date_BS: string;
  Gold_Price_Per_Tola: string;
}

export const chartData: ChartJSData = {
  labels: sortedData.map((item) => item.Date_AD),
  datasets: [
    {
      label: 'Gold Price Per Tola',
      data: sortedData.map((item) => Number(item.Gold_Price_Per_Tola)),
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: false,
      pointRadius: 0
    }
  ]
}

export const latestData = sortedData[sortedData.length - 1];

export function getTableData(yearStr: string, monthStr: string): TableData[] {
  let rSortedData = [...sortedData];
  rSortedData = rSortedData.sort((a, b) => { return new Date(b.Date_AD).getTime() - new Date(a.Date_AD).getTime(); });
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (year === 0) {
    return rSortedData;
  }

  let data = rSortedData.filter((item) => new Date(item.Date_AD).getFullYear() === year);
  if (month > 0 && month < 13) {
    data = data.filter((item) => new Date(item.Date_AD).getMonth() === month - 1);
  }
  return data;
}

export function getChartData(yearStr: string, monthStr: string): ChartJSData {
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (year === 0) {
    return chartData;
  }

  let data = sortedData.filter((item) => new Date(item.Date_AD).getFullYear() === year);
  if (month > 0 && month < 13) {
    data = data.filter((item) => new Date(item.Date_AD).getMonth() === month - 1);
  }
  return {
    labels: data.map((item) => item.Date_AD),
    datasets: [
      {
        label: 'Gold Price Per Tola',
        data: data.map((item) => Number(item.Gold_Price_Per_Tola)),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
        pointRadius: 0
      }
    ]
  }
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        callback: function (value: unknown) {
          return 'Rs.' + value;
        }
      },
    },
  },
}
