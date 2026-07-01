import {
  Brain,
  Code2,
  GitBranch,
  Target,
  TrendingUp,
  AlertTriangle,
  Activity,
} from "lucide-react";

const ActivityCoachCard = ({ coach }) => {
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
          h-12
          w-12

          rounded-xl

          bg-purple-50
          dark:bg-purple-900/20

          flex
          items-center
          justify-center
          "
        >
          <Brain size={22} className="text-purple-600 dark:text-purple-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Activity Coach
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last 45 days analysis
          </p>
        </div>
      </div>

      {/* Activity Score */}

      {/* Top Section */}

      <div className="grid grid-cols-3 gap-4">
        {/* Activity Score */}

        <div
          className="
    col-span-2

    rounded-2xl

    bg-gradient-to-r
    from-purple-600
    to-indigo-600

    p-5

    text-white
    "
        >
          <p className="text-sm opacity-80">Activity Score</p>

          <h2 className="text-5xl font-bold mt-2">{coach.activityScore}/100</h2>

          <p className="text-sm opacity-80 mt-2">Based on your last 45 days</p>
        </div>

        {/* Right Side */}

        <div className="flex flex-col gap-4">
          {/* Active Days */}

          <div
            className="
      flex-1

      rounded-2xl

      bg-slate-50
      dark:bg-slate-800

      p-4

      flex
      items-center
      gap-3
      "
          >
            <Activity size={22} className="text-purple-600" />

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active Days
              </p>

              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {coach.activeDays}
              </p>
            </div>
          </div>

          {/* Activity Rate */}

          <div
            className="
      flex-1

      rounded-2xl

      bg-slate-50
      dark:bg-slate-800

      p-4

      flex
      items-center
      gap-3
      "
          >
            <TrendingUp size={22} className="text-green-600" />

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Activity Rate
              </p>

              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round((coach.activeDays / 45) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coding vs Development */}

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
              Coding Activity
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-3 text-slate-900 dark:text-white">
            {coach.coding45Days}
          </h3>
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
            <GitBranch size={18} className="text-blue-600" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Development Activity
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-3 text-slate-900 dark:text-white">
            {coach.github45Days}
          </h3>
        </div>
      </div>

      {/* Insights */}

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div
          className="
          rounded-2xl

          bg-slate-50
          dark:bg-slate-800

          p-4

          text-center
          "
        >
          <TrendingUp className="mx-auto text-blue-600" size={20} />

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Focus
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {coach.focus}
          </p>
        </div>

        <div
          className="
          rounded-2xl

          bg-slate-50
          dark:bg-slate-800

          p-4

          text-center
          "
        >
          <Target className="mx-auto text-green-600" size={20} />

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Strength
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {coach.strength}
          </p>
        </div>

        <div
          className="
          rounded-2xl

          bg-slate-50
          dark:bg-slate-800

          p-4

          text-center
          "
        >
          <AlertTriangle className="mx-auto text-orange-500" size={20} />

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Improve
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {coach.needsAttention}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCoachCard;
