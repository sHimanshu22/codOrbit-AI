const DifficultyAnalytics = ({
  difficultyStats,
}) => {
  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
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
          Difficulty Progress
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Progress across Easy, Medium and Hard problems
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(
          difficultyStats || {},
        ).map(
          ([difficulty, stats]) => {
            const percentage =
              stats.total > 0
                ? Math.round(
                    (stats.solved /
                      stats.total) *
                      100,
                  )
                : 0;

            return (
              <div
                key={difficulty}
              >
                <div className="flex justify-between mb-2">

                  <span
                    className="
                    font-medium
                    text-slate-700
                    dark:text-slate-300
                    "
                  >
                    {difficulty}
                  </span>

                  <span
                    className="
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                    "
                  >
                    {stats.solved}/
                    {stats.total}
                  </span>

                </div>

                <div
                  className="
                  w-full
                  h-3
                  bg-slate-100
                  dark:bg-slate-800
                  rounded-full
                  overflow-hidden
                  "
                >
                  <div
                    className={`
                    h-full
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      difficultyColors[
                        difficulty
                      ] ||
                      "bg-blue-500"
                    }
                    `}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <div className="mt-2 text-right">
                  <span
                    className="
                    text-xs
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                    "
                  >
                    {percentage}% Complete
                  </span>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default DifficultyAnalytics;