import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";

import "react-calendar-heatmap/dist/styles.css";

import "../styles/heatmap.css";

const ActivityHeatmap = ({
  title,
  data,
  type,
}) => {

  const totalActivities =
    data.reduce(
      (sum, day) =>
        sum + day.count,
      0
    );

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

        <h2 className="text-xl font-bold text-slate-900">

          {title}

        </h2>

        <p className="text-slate-500 text-sm mt-1">

          Total Activity

        </p>

        <p className="text-3xl font-bold mt-2">

          {totalActivities}

        </p>

      </div>

      <div className="overflow-x-auto">

        <CalendarHeatmap
          startDate={
            new Date(
              Date.now() -
                365 *
                  24 *
                  60 *
                  60 *
                  1000
            )
          }
          endDate={
            new Date()
          }
          values={data}
          showMonthLabels
          showWeekdayLabels
          gutterSize={4}
          classForValue={(
            value
          ) => {

            if (
              !value ||
              value.count === 0
            ) {
              return "color-empty";
            }

            if (
              type ===
              "coding"
            ) {

              if (
                value.count <=
                2
              )
                return "green-scale-1";

              if (
                value.count <=
                5
              )
                return "green-scale-2";

              if (
                value.count <=
                10
              )
                return "green-scale-3";

              return "green-scale-4";
            }

            if (
              value.count <= 2
            )
              return "blue-scale-1";

            if (
              value.count <= 5
            )
              return "blue-scale-2";

            if (
              value.count <= 10
            )
              return "blue-scale-3";

            return "blue-scale-4";
          }}
          tooltipDataAttrs={(
            value
          ) => {

            if (!value)
              return null;

            return {
              "data-tooltip-content": `${value.date}
              • ${value.count} activities`,
            };
          }}
        />

      </div>

      <div className="flex items-center gap-2 mt-6">

        <span className="text-sm text-slate-500">

          Less

        </span>

        <div className="flex gap-1">

          <div className="w-4 h-4 rounded bg-slate-100"></div>

          <div
            className={`w-4 h-4 rounded ${
              type === "coding"
                ? "bg-green-200"
                : "bg-blue-200"
            }`}
          />

          <div
            className={`w-4 h-4 rounded ${
              type === "coding"
                ? "bg-green-400"
                : "bg-blue-400"
            }`}
          />

          <div
            className={`w-4 h-4 rounded ${
              type === "coding"
                ? "bg-green-600"
                : "bg-blue-600"
            }`}
          />

        </div>

        <span className="text-sm text-slate-500">

          More

        </span>

      </div>

      <Tooltip />

    </div>
  );
};

export default ActivityHeatmap;