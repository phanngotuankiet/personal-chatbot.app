// Component hiển thị Sahm Rule
const SahmRuleIndicator = () => {
  const unemploymentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    rates: [4.0, 4.0, 4.1, 4.1, 4.2, 4.1, 4.3],
  };

  // Ví dụ minh họa cách tính Sahm Rule
  const calculateSahmRule = (unemploymentRates: number[]) => {
    // Lấy trung bình 3 tháng gần nhất
    const last3MonthAvg =
      unemploymentRates.slice(-3).reduce((a, b) => a + b) / 3;

    // Tìm mức thấp nhất 12 tháng trước
    const last12MonthsMin = Math.min(...unemploymentRates.slice(-12));

    // Tính chênh lệch
    const difference = last3MonthAvg - last12MonthsMin;

    return difference >= 0.5; // Trả về true nếu kích hoạt Sahm Rule
  };

  const isSahmRuleTriggered = calculateSahmRule(unemploymentData.rates);

  return (
    <div className="p-4 border rounded">
      <h3>Sahm Rule Status</h3>

      <div
        className={`mt-2 ${
          isSahmRuleTriggered ? "text-red-500" : "text-green-500"
        }`}
      >
        {isSahmRuleTriggered ? "Warning: Triggered" : "Normal"}
      </div>
    </div>
  );
};

export default SahmRuleIndicator;
