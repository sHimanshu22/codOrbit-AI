const DeveloperScoreCard = ({
  score,
  level,
}) => {
  const getColor = () => {
    if (score >= 80)
      return "text-green-600 dark:text-green-400";

    if (score >= 60)
      return "text-blue-600 dark:text-blue-400";

    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      border
      border-slate-200
      dark:border-slate-800
      p-8
      shadow-sm
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Developer Score
          </p>

          <h2
            className={`
            text-7xl
            font-bold
            mt-2
            ${getColor()}
          `}
          >
            {score}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 mt-3 text-lg">
            {level}
          </p>
        </div>

        <div
          className="
          h-24
          w-24
          rounded-full
          bg-blue-50
          dark:bg-blue-900/20
          flex
          items-center
          justify-center
        "
        >
          <span className="text-4xl">
            🏆
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-slate-400">
            Placement Readiness
          </span>

          <span className="font-medium text-slate-900 dark:text-slate-100">
            {score}%
          </span>
        </div>

        <div
          className="
          h-3
          bg-slate-100
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
          "
            style={{
              width: `${score}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperScoreCard;