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
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
      "
    >

      <div className="mb-6">

        <h2 className="text-xl font-bold">

          Rating Progress

        </h2>

        <p className="text-slate-500">

          Rating trend across contests

        </p>

      </div>

      {!data.length ? (

        <div className="py-12 text-center text-slate-500">

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

            <LineChart
              data={data}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="rating"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );
};

export default RatingGraph;