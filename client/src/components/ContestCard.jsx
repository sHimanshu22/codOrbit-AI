import ContestCountdown from "./ContestCountdown";

const ContestCard = ({
  contest,
}) => {
  const start = new Date(
    contest.startTime,
  );

  const getPlatformColor = (
    platform,
  ) => {
    switch (
      platform?.toLowerCase()
    ) {
      case "codeforces":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";

      case "leetcode":
        return "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";

      case "codechef":
        return "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      p-5
      shadow-sm
      hover:shadow-md
      transition-all
      duration-300
      "
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3
            className="
            font-semibold
            text-lg
            text-slate-900
            dark:text-white
            "
          >
            {contest.name}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {contest.platform}
          </p>
        </div>

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          ${getPlatformColor(
            contest.platform,
          )}
          `}
        >
          {contest.platform}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Starts At
        </p>

        <p
          className="
          mt-1
          font-medium
          text-slate-900
          dark:text-white
          "
        >
          {start.toLocaleString()}
        </p>
      </div>

      <div
        className="
        mt-5
        p-4
        rounded-xl
        bg-green-50
        dark:bg-green-900/20
        border
        border-green-100
        dark:border-green-900/30
        "
      >
        <p
          className="
          text-sm
          text-green-700
          dark:text-green-400
          font-medium
          "
        >
          ⏳ Starts In
        </p>

        <div
          className="
          mt-1
          font-semibold
          text-green-800
          dark:text-green-300
          "
        >
          <ContestCountdown
            startTime={
              contest.startTime
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContestCard;