import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div
        className="
        bg-slate-900
        border
        border-slate-700
        rounded-xl
        px-4
        py-3
        shadow-lg
        "
      >
        <p className="text-white font-medium">
          {label}
        </p>

        <p className="text-slate-300 mt-1">
          Value:
          {" "}
          <span className="text-white font-semibold">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const PlatformComparisonChart = ({
  data,
}) => {
  const getBarColor = (
    platform,
  ) => {
    switch (
      platform.toLowerCase()
    ) {
      case "github repos":
        return "#24292e";

      case "leetcode":
        return "#FFA116";

      case "codeforces":
        return "#1F8ACB";

      default:
        return "#3b82f6";
    }
  };

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
          Platform Comparison
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Compare activity across platforms
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
              dataKey="platform"
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
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            >
              {data.map(
                (
                  entry,
                  index,
                ) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(
                      entry.platform,
                    )}
                  />
                ),
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformComparisonChart;