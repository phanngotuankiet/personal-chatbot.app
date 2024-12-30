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
  // Data từ hình ảnh
  const data = {
    labels: ['1929', '1930', '1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938', '1939', '1940', '1941', '1942'],
    datasets: [
      {
        label: 'Tỷ lệ thất nghiệp (%)',
        data: [3.2, 8.7, 15.9, 23.6, 24.9, 21.7, 20.1, 16.9, 14.3, 19.0, 17.2, 14.6, 9.9, 4.7],
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
        text: 'Tỷ lệ thất nghiệp tại Mỹ (1929-1942)',
      },
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
      
    </div>
  );
};

export default UnemploymentChart; 