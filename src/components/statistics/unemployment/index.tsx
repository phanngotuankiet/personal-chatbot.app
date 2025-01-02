import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { unemploymentData1929_2023 } from './data/unemployment1929-2023';

// Đăng ký các components cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UnemploymentChart = () => {
   // Data từ https://www.investopedia.com/historical-us-unemployment-rate-by-year-7495494
  const filteredData = unemploymentData1929_2023.filter(
    item => item.year >= 1929 && item.year <= 2023
  );

  console.log(filteredData);

  const data = {
    labels: filteredData.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Tỷ lệ thất nghiệp (%)',
        data: filteredData.map(item => item.rate),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tỷ lệ thất nghiệp tại Mỹ',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataIndex = context.dataIndex;
            const event = filteredData[dataIndex].event;
            return [
              `Tỷ lệ: ${context.raw}%`,
              `Sự kiện: ${event}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tỷ lệ thất nghiệp (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Năm'
        }
      }
    }
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow">
      <Line options={options} data={data} />
      
      <div className="mt-4 overflow-auto max-h-60">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Năm</th>
              <th className="px-4 py-2">Tỷ lệ (%)</th>
              <th className="px-4 py-2">Sự kiện</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.year} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.year}</td>
                <td className="px-4 py-2">{item.rate}%</td>
                <td className="px-4 py-2">{item.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnemploymentChart; 