import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RatingGraph = ({
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Rating Progress
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Rating trend across contests
        </p>
      </div>

      {!data.length ? (
        <div className="py-12 text-center text-slate-500 dark:text-slate-400">
          No contest data available yet.
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: 350,
          }}
        >
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tick={{
                  fill: "#94a3b8",
                }}
              />

              <YAxis
                stroke="#94a3b8"
                tick={{
                  fill: "#94a3b8",
                }}
              />

              <Tooltip
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
                  color: "#60a5fa",
                }}
              />

              <Line
                type="monotone"
                dataKey="rating"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#3b82f6",
                }}
                activeDot={{
                  r: 7,
                  fill: "#60a5fa",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RatingGraph;