const TopicAnalytics = ({
  topicStats,
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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Topic Progress
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Track progress across DSA topics
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(topicStats).map(
          ([topic, stats]) => {
            const percentage =
              Math.round(
                (stats.solved /
                  stats.total) *
                  100,
              ) || 0;

            return (
              <div key={topic}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p
                      className="
                      font-medium
                      text-slate-900
                      dark:text-white
                      "
                    >
                      {topic}
                    </p>

                    <p
                      className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      "
                    >
                      {stats.solved}/
                      {stats.total} Solved
                    </p>
                  </div>

                  <span
                    className="
                    text-sm
                    font-semibold
                    text-blue-600
                    dark:text-blue-400
                    "
                  >
                    {percentage}%
                  </span>
                </div>

                <div
                  className="
                  w-full
                  h-3
                  bg-slate-200
                  dark:bg-slate-800
                  rounded-full
                  overflow-hidden
                  "
                >
                  <div
                    className="
                    h-full
                    bg-blue-600
                    rounded-full
                    transition-all
                    duration-500
                    "
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default TopicAnalytics;