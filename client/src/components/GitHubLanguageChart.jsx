import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
];

const GitHubLanguageChart = ({
  data,
}) => {
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
        <h2
          className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          GitHub Language Distribution
        </h2>

        <p
          className="
          text-slate-500
          dark:text-slate-400
          "
        >
          Technologies used across repositories
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ language, percent }) =>
                `${language} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              itemStyle={{
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#cbd5e1",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#cbd5e1",
                paddingTop: "20px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GitHubLanguageChart;