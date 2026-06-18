import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GitHubLanguageChart = ({
  data,
}) => {

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

        <h2 className="text-xl font-bold">

          GitHub Language Distribution

        </h2>

        <p className="text-slate-500">

          Technologies used across repositories

        </p>

      </div>

      <div
        style={{
          width: "100%",
          height:400 ,
        }}
      >

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="language"
              outerRadius={110}
              label
            />

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
};

export default GitHubLanguageChart;