import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PlatformComparisonChart = ({ data }) => {
  return (
    <div
      className="
  bg-white
  border
  border-slate-200
  rounded-3xl
  p-6
  shadow-sm
  "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold">Platform Comparison</h2>

        <p className="text-slate-500">Compare activity across platforms</p>
      </div>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="platform" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformComparisonChart;
