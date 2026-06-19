import {
  BarChart3,
  Calendar,
  TrendingUp,
} from "lucide-react";

const ActivityInsights = ({
  insights,
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
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-blue-50
          dark:bg-blue-900/20
          flex
          items-center
          justify-center
          "
        >
          <BarChart3
            size={22}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2
            className="
            text-xl
            font-bold
            text-slate-900
            dark:text-slate-100
            "
          >
            Activity Insights
          </h2>

          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            "
          >
            Weekly productivity overview
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className="
          bg-slate-50
          dark:bg-slate-800
          rounded-2xl
          p-4
          "
        >
          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            "
          >
            Coding Activity
          </p>

          <p
            className="
            text-3xl
            font-bold
            mt-2
            text-slate-900
            dark:text-slate-100
            "
          >
            {insights.codingWeek}
          </p>
        </div>

        <div
          className="
          bg-slate-50
          dark:bg-slate-800
          rounded-2xl
          p-4
          "
        >
          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            "
          >
            Development Activity
          </p>

          <p
            className="
            text-3xl
            font-bold
            mt-2
            text-slate-900
            dark:text-slate-100
            "
          >
            {insights.githubWeek}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div
          className="
          flex
          items-center
          gap-3
          text-slate-700
          dark:text-slate-300
          "
        >
          <Calendar
            size={18}
            className="text-green-600"
          />

          <span>
            Most Active Coding Day:{" "}
            <strong>
              {insights.mostActiveCodingDay}
            </strong>
          </span>
        </div>

        <div
          className="
          flex
          items-center
          gap-3
          text-slate-700
          dark:text-slate-300
          "
        >
          <Calendar
            size={18}
            className="text-blue-600"
          />

          <span>
            Most Active Development Day:{" "}
            <strong>
              {insights.mostActiveGithubDay}
            </strong>
          </span>
        </div>

        <div
          className="
          flex
          items-center
          gap-3
          text-slate-700
          dark:text-slate-300
          "
        >
          <TrendingUp
            size={18}
            className="text-orange-500"
          />

          <span>
            Consistency:{" "}
            <strong>
              {insights.consistency}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityInsights;