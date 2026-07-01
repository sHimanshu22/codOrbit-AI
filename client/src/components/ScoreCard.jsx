import {
  GitBranchIcon,
  Brain,
  Trophy,
  BarChart3,
} from "lucide-react";

const ScoreCard = ({
  title,
  score,
}) => {
  const normalizedScore = Math.min(
    Math.max(score || 0, 0),
    100
  );

  const getConfig = () => {
    switch (title) {
      case "Development Score":
        return {
          icon: GitBranchIcon,
          color:
            "text-green-600 dark:text-green-300",
          bg:
            "bg-green-100 dark:bg-green-800",
          progress:
            "bg-green-600",
        };

      case "DSA Score":
        return {
          icon: Brain,
          color:
            "text-blue-600 dark:text-blue-400",
          bg:
            "bg-blue-100 dark:bg-blue-900/20",
          progress:
            "bg-blue-600",
        };

      case "CP Score":
        return {
          icon: Trophy,
          color:
            "text-amber-600 dark:text-amber-400",
          bg:
            "bg-amber-100 dark:bg-amber-900/20",
          progress:
            "bg-amber-500",
        };

      case "Consistency Score":
        return {
          icon: BarChart3,
          color:
            "text-red-600 dark:text-red-400",
          bg:
            "bg-red-100 dark:bg-red-900/20",
          progress:
            "bg-red-500",
        };

      default:
        return {
          icon: BarChart3,
          color:
            "text-blue-600 dark:text-blue-400",
          bg:
            "bg-blue-100 dark:bg-blue-900/20",
          progress:
            "bg-blue-600",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

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
      "
    >
      <div className="flex items-center justify-between">
        <p
          className="
          text-sm
          font-medium

          text-slate-500
          dark:text-slate-400
          "
        >
          {title}
        </p>

        <div
          className={`
          w-10
          h-10

          rounded-xl

          flex
          items-center
          justify-center

          ${config.bg}
          `}
        >
          <Icon
            size={20}
            className={config.color}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-end gap-2">
          <h2
            className="
            text-5xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            {normalizedScore}
          </h2>

          <span
            className="
            mb-2

            text-sm

            text-slate-400
            dark:text-slate-500
            "
          >
            pts
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div
          className="
          w-full
          h-2.5

          rounded-full

          bg-slate-100
          dark:bg-slate-800
          "
        >
          <div
            className={`
            h-2.5
            rounded-full

            transition-all
            duration-700

            ${config.progress}
            `}
            style={{
              width: `${normalizedScore}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;