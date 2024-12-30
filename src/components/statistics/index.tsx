import SahmRuleIndicator from "./sahm-rule";
import UnemploymentChart from "./unemployment";

const Statistics = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Thống kê tỷ lệ thất nghiệp
        </h1>

        <UnemploymentChart />
        <SahmRuleIndicator />
      </div>
    </div>
  );
};

export default Statistics;
