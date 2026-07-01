import {
  Activity,
  Code2,
  CalendarDays,
  Flame,
  GitBranchIcon,
} from "lucide-react";

const ActivityInsights = ({ insights }) => {
  const totalActivity = (insights.codingWeek || 0) + (insights.githubWeek || 0);

  const codingPercentage =
    totalActivity > 0
      ? Math.round((insights.codingWeek / totalActivity) * 100)
      : 0;

  const githubPercentage =
    totalActivity > 0
      ? Math.round((insights.githubWeek / totalActivity) * 100)
      : 0;

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
      {/* Header */}

      <div className="flex items-center gap-4 mb-8">
        <div
          className="
          w-12
          h-12

          rounded-xl

          bg-blue-50
          dark:bg-blue-900/20

          flex
          items-center
          justify-center
          "
        >
          <Activity size={22} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Weekly Activity
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last 7 days overview
          </p>
        </div>
      </div>

      {/* Total */}

      <div
        className="
        rounded-2xl

        bg-gradient-to-r
        from-blue-600
        to-indigo-600

        text-white

        p-5
        "
      >
        <p className="text-sm opacity-80">Total Activities</p>

        <h2 className="text-4xl font-bold mt-2">{totalActivity}</h2>

        <p className="text-sm opacity-80 mt-1">Coding + Development</p>
      </div>

      {/* Breakdown */}

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div
          className="
          rounded-2xl

          bg-slate-50
          dark:bg-slate-800

          p-4
          "
        >
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-green-600" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Coding
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-3 text-slate-900 dark:text-white">
            {insights.codingWeek}
          </h3>

          <p className="text-xs text-slate-500 mt-2">
            {codingPercentage}% of weekly activity
          </p>
        </div>

        <div
          className="
          rounded-2xl

          bg-slate-50
          dark:bg-slate-800

          p-4
          "
        >
          <div className="flex items-center gap-2">
            <GitBranchIcon size={18} className="text-blue-600" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Development
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-3 text-slate-900 dark:text-white">
            {insights.githubWeek}
          </h3>

          <p className="text-xs text-slate-500 mt-2">
            {githubPercentage}% of weekly activity
          </p>
        </div>
      </div>

      {/* Weekly Summary */}

      <div className="mt-7 grid grid-cols-3 gap-4">
        {/* Best Coding Day */}

        <div
          className="
    flex
    flex-col
    items-center
    text-center

    rounded-2xl

    bg-slate-50
    dark:bg-slate-800

    p-4
    "
        >
          <CalendarDays size={22} className="text-green-600 mb-2" />

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Best Coding Day
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {insights.mostActiveCodingDay || "-"}
          </p>
        </div>

        {/* Best Development Day */}

        <div
          className="
    flex
    flex-col
    items-center
    text-center

    rounded-2xl

    bg-slate-50
    dark:bg-slate-800

    p-4
    "
        >
          <GitBranchIcon size={22} className="text-blue-600 mb-2" />

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Best Development Day
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {insights.mostActiveGithubDay || "-"}
          </p>
        </div>

        {/* Weekly Consistency */}

        <div
          className="
    flex
    flex-col
    items-center
    text-center

    rounded-2xl

    bg-slate-50
    dark:bg-slate-800

    p-4
    "
        >
          <Flame size={22} className="text-orange-500 mb-2" />

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Consistency
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {insights.consistency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityInsights;
