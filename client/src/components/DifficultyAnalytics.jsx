const DifficultyAnalytics = ({ difficultyStats }) => {
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
      p-8
      shadow-sm
      h-full
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Difficulty Progress
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Progress across Easy, Medium and Hard problems
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(difficultyStats || {}).map(([difficulty, stats]) => {
          const percentage =
            stats.total > 0
              ? Math.round((stats.solved / stats.total) * 100)
              : 0;

          return (
            <div key={difficulty}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-3xl font-medium text-slate-800 dark:text-slate-200">
                  {difficulty}
                </span>

                <span className="text-lg text-slate-500 dark:text-slate-400">
                  {stats.solved}/{stats.total}
                </span>
              </div>

              <div className="h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    difficultyColors[difficulty] || "bg-blue-500"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div className="mt-3 text-right">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {percentage}% Complete
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultyAnalytics;