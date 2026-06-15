import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LeetCodeDifficultyChart = ({
  data,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        LeetCode Difficulty Breakdown
      </h2>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default LeetCodeDifficultyChart;