const AICoachCard = ({
  coach,
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
          🤖 AI DSA Coach
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Personalized guidance for your preparation
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400">
            Stage
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {coach.title}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400">
            Completion
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {coach.completion}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400">
            Readiness
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {coach.readiness}
          </span>
        </div>
      </div>

      <div
        className="
        mt-6
        p-4
        rounded-2xl
        bg-amber-50
        dark:bg-amber-900/20
        border
        border-amber-200
        dark:border-amber-800
        "
      >
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
          Weak Topics
        </h3>

        <p className="text-slate-600 dark:text-slate-300">
          {coach.weakTopics.length > 0
            ? coach.weakTopics.join(", ")
            : "No weak topics detected"}
        </p>
      </div>

      <div
        className="
        mt-4
        p-4
        rounded-2xl
        bg-blue-50
        dark:bg-blue-900/20
        border
        border-blue-200
        dark:border-blue-800
        "
      >
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
          💡 Recommendation
        </h3>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {coach.recommendation}
        </p>
      </div>
    </div>
  );
};

export default AICoachCard;