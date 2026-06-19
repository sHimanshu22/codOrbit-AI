import {
  Code2,
  Award,
  GitCommit,
} from "lucide-react";

const StreakCard = ({
  title,
  current,
  longest,
}) => {
  const isStrong = current >= 7;

  const isCoding =
    title.toLowerCase().includes("coding");

  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      duration-200
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2
            className="
            text-5xl
            font-bold
            mt-3
            text-slate-900
            dark:text-white
            "
          >
            {current}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Day Streak
          </p>
        </div>

        <div
          className={`
          h-12
          w-12
          rounded-xl
          flex
          items-center
          justify-center

          ${
            isCoding
              ? "bg-blue-50 dark:bg-blue-900/20"
              : "bg-violet-50 dark:bg-violet-900/20"
          }
          `}
        >
          {isCoding ? (
            <Code2
              size={22}
              className="
              text-blue-600
              dark:text-blue-400
              "
            />
          ) : (
            <GitCommit
              size={22}
              className="
              text-violet-600
              dark:text-violet-400
              "
            />
          )}
        </div>
      </div>

      <div
        className="
        mt-6
        pt-4
        border-t
        border-slate-100
        dark:border-slate-800
        "
      >
        <div className="flex items-center gap-2">
          <Award
            size={16}
            className="
            text-amber-500
            "
          />

          <span className="text-sm text-slate-600 dark:text-slate-400">
            Longest {title}
          </span>
        </div>

        <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">
          {longest} Days
        </p>
      </div>

      <p className="text-sm text-slate-400 dark:text-slate-500 mt-4">
        {isStrong
          ? "Excellent consistency. Keep it going."
          : "Build momentum with daily practice."}
      </p>
    </div>
  );
};

export default StreakCard;