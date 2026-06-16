import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RatingGraph = ({
  data,
}) => {

  if (!data.length) {

    return (
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Rating Progress
        </h2>

        <p>
          No contest data available yet.
        </p>

      </div>
    );
  }

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Rating Progress
      </h2>

      <div
        style={{
          width: "100%",
          height: 350,
        }}
      >

        <ResponsiveContainer>

          <LineChart data={data}>

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="rating"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RatingGraph;