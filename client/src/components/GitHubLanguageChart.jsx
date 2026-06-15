import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts";

const GitHubLanguageChart = ({ data }) => {
  console.log("Chart Data:", data);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        GitHub Language Distribution
      </h2>

      <PieChart width={600} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="language"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        />

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default GitHubLanguageChart;