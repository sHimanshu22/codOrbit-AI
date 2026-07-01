import {
  Sprout,
  Rocket,
  Hammer,
  Star,
  Flame,
  Crown,
} from "lucide-react";

const DeveloperScoreCard = ({
  score,
  level,
  description,
}) => {
  const getLevelConfig = () => {
    switch (level) {
      case "Explorer":
        return {
          icon: Sprout,
          color:
            "text-green-600 dark:text-green-400",
          bg:
            "bg-green-50 dark:bg-green-900/20",
        };

      case "Learner":
        return {
          icon: Rocket,
          color:
            "text-blue-600 dark:text-blue-400",
          bg:
            "bg-blue-50 dark:bg-blue-900/20",
        };

      case "Builder":
        return {
          icon: Hammer,
          color:
            "text-orange-600 dark:text-orange-400",
          bg:
            "bg-orange-50 dark:bg-orange-900/20",
        };

      case "Advanced":
        return {
          icon: Star,
          color:
            "text-yellow-600 dark:text-yellow-400",
          bg:
            "bg-yellow-50 dark:bg-yellow-900/20",
        };

      case "Expert":
        return {
          icon: Flame,
          color:
            "text-red-600 dark:text-red-400",
          bg:
            "bg-red-50 dark:bg-red-900/20",
        };

      case "Orbit Master":
        return {
          icon: Crown,
          color:
            "text-purple-600 dark:text-purple-400",
          bg:
            "bg-purple-50 dark:bg-purple-900/20",
        };

      default:
        return {
          icon: Sprout,
          color:
            "text-slate-600 dark:text-slate-300",
          bg:
            "bg-slate-100 dark:bg-slate-800",
        };
    }
  };

  const config = getLevelConfig();
  const Icon = config.icon;

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
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Developer Score
          </p>

          <h2
            className={`
            text-7xl
            font-bold
            mt-2
            ${config.color}
            `}
          >
            {score}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <Icon
              size={22}
              className={config.color}
            />

            <span
              className={`
              font-semibold
              text-lg
              ${config.color}
              `}
            >
              {level}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`
          h-24
          w-24

          rounded-full

          flex
          items-center
          justify-center

          ${config.bg}
          `}
        >
          <Icon
            size={42}
            className={config.color}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-slate-400">
            Overall Progress
          </span>

          <span className="font-medium text-slate-900 dark:text-slate-100">
            {score}/100
          </span>
        </div>

        <div
          className="
          h-3

          rounded-full

          bg-slate-100
          dark:bg-slate-800

          overflow-hidden
          "
        >
          <div
            className={`
            h-full
            rounded-full
            transition-all
            duration-700

            ${
              level === "Explorer"
                ? "bg-green-500"
                : level === "Learner"
                  ? "bg-blue-500"
                  : level === "Builder"
                    ? "bg-orange-500"
                    : level === "Advanced"
                      ? "bg-yellow-500"
                      : level === "Expert"
                        ? "bg-red-500"
                        : "bg-purple-600"
            }
            `}
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