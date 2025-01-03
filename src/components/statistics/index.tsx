import Header from "../header";
import SahmRuleIndicator from "./sahm-rule";
import UnemploymentChart from "./unemployment";

const Statistics = () => {
  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto p-8">
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
