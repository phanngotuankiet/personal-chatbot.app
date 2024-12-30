import UnemploymentChart from "../components/statistics/unemployment";

const Statistics = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Thống kê tỷ lệ thất nghiệp
        </h1>

        <UnemploymentChart />
      </div>
    </div>
  );
};

export default Statistics;
