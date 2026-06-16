import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";

import "react-calendar-heatmap/dist/styles.css";

import "../styles/heatmap.css";

const ActivityHeatmap = ({ title, data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
          endDate={new Date()}
          values={data}
          showMonthLabels
          showWeekdayLabels
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return "color-empty";
            }

            if (value.count <= 2) {
              return "color-scale-1";
            }

            if (value.count <= 5) {
              return "color-scale-2";
            }

            if (value.count <= 10) {
              return "color-scale-3";
            }

            return "color-scale-4";
          }}
          tooltipDataAttrs={(value) => {
            if (!value) {
              return null;
            }

            return {
              "data-tip": `${value.date}
                 : ${value.count}
                 activities`,
            };
          }}
        />
      </div>
      <Tooltip />
    </div>
  );
};

export default ActivityHeatmap;
