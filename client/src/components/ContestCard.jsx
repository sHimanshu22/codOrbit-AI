import ContestCountdown from "./ContestCountdown";

import {
  CalendarDays,
  Clock3,
  MonitorPlay,
} from "lucide-react";

const ContestCard = ({ contest }) => {
  const start = new Date(contest.startTime);

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
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
      p-4
      shadow-sm
      hover:shadow-md
      transition-all
      duration-300
      "
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left */}

        <div className="min-w-0 flex-1">
          <h3
            className="
            font-semibold
            text-slate-900
            dark:text-white
            truncate
            "
          >
            {contest.name}
          </h3>

          <div
            className="
            flex
            items-center
            gap-2
            mt-2
            text-xs
            text-slate-500
            dark:text-slate-400
            "
          >
            <CalendarDays size={14} />

            <span>
              {start.toLocaleDateString()} •{" "}
              {start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Platform Badge */}

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          whitespace-nowrap
          ${getPlatformColor(contest.platform)}
          `}
        >
          {contest.platform}
        </span>
      </div>

      {/* Countdown */}

      <div
        className="
        mt-4
        flex
        items-center
        justify-between

        bg-slate-50
        dark:bg-slate-800/50

        rounded-xl
        px-3
        py-2
        "
      >
        <div className="flex items-center gap-2">
          <Clock3
            size={15}
            className="text-green-600 dark:text-green-400"
          />

          <span
            className="
            text-sm
            text-slate-600
            dark:text-slate-300
            "
          >
            Starts In
          </span>
        </div>

        <span
          className="
          text-sm
          font-semibold
          text-green-700
          dark:text-green-400
          "
        >
          <ContestCountdown startTime={contest.startTime} />
        </span>
      </div>
    </div>
  );
};

export default ContestCard;