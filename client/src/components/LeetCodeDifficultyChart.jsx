import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

const LeetCodeDifficultyChart = ({ data }) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-6
      shadow-sm
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          LeetCode Difficulty Breakdown
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Easy, Medium and Hard distribution
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(59,130,246,0.08)",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: 600,
              }}
              itemStyle={{
                color: "#ffffff",
              }}
            />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[entry.name] ||
                    "#2563eb"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeetCodeDifficultyChart;