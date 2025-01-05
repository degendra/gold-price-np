import jsonData from '../assets/trend-data.json';

const sortedData = jsonData.sort((a, b) => {
  return new Date(a.Date_AD).getTime() - new Date(b.Date_AD).getTime();
}
);

// export const data = jsonData;

interface ChartJSData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
    fill: boolean;
  }>;
}

export const chartData: ChartJSData = {
  labels: sortedData.map((item) => item.Date_AD),
  datasets: [
    {
      label: 'Trend Data',
      data: sortedData.map((item) => Number(item.Gold_Price_Per_Tola)),
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: false
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
