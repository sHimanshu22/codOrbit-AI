import {
  BookOpen,
  Layers3,
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const SheetCard = ({
  sheet,
  active,
  expanded,
  onToggleRoadmap,
  onToggleSheet,
}) => {
  const roadmap = sheet.roadmap || [];

  return (
    <div
      className="
      flex
      flex-col

      h-full

      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-3xl

      p-6

      shadow-sm
      hover:shadow-md

      transition-all
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {sheet.name}
          </h3>

          <p
            className="
            mt-3

            text-sm
            leading-7

            text-slate-600
            dark:text-slate-400
            "
          >
            {sheet.description}
          </p>
        </div>

        <span
          className={`
          shrink-0

          px-3
          py-1

          rounded-full

          text-xs
          font-semibold

          ${
            active
              ? `
                bg-green-100
                text-green-700

                dark:bg-green-900/20
                dark:text-green-400
              `
              : `
                bg-slate-100
                text-slate-600

                dark:bg-slate-800
                dark:text-slate-400
              `
          }
          `}
        >
          {active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Info Grid */}

      <div className="grid grid-cols-2 gap-4 mt-8">
        <InfoCard
          icon={<BookOpen size={16} />}
          title="Questions"
          value={sheet.totalQuestions}
        />

        <InfoCard
          icon={<Layers3 size={16} />}
          title="Modules"
          value={sheet.moduleCount}
        />

        <InfoCard
          icon={<Target size={16} />}
          title="Best For"
          value={sheet.bestFor}
        />

        <InfoCard
          icon={<BarChart3 size={16} />}
          title="Difficulty"
          value={sheet.difficulty}
        />
      </div>

      {/* Roadmap */}

      <button
        onClick={() => onToggleRoadmap(sheet.name)}
        className="
        mt-8

        flex
        items-center
        justify-center
        gap-2

        w-full

        py-3

        rounded-xl

        border
        border-slate-200
        dark:border-slate-700

        bg-slate-50
        dark:bg-slate-800

        hover:bg-slate-100
        dark:hover:bg-slate-700

        text-slate-700
        dark:text-slate-300

        font-medium

        transition-all
        "
      >
        {expanded ? (
          <>
            <ChevronUp size={18} />
            Hide Roadmap
          </>
        ) : (
          <>
            <ChevronDown size={18} />
            View Roadmap
          </>
        )}
      </button>

      {expanded && (
        <div
          className="
          mt-6

          border-t
          border-slate-200
          dark:border-slate-800

          pt-6
          "
        >
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
            Roadmap Modules
          </h4>

          <div className="space-y-3">
            {roadmap.map((module, index) => (
              <div
                key={module}
                className="
                flex
                items-center
                gap-3
                "
              >
                <div
                  className="
                  w-7
                  h-7

                  rounded-full

                  bg-blue-100
                  dark:bg-blue-900/30

                  text-blue-600
                  dark:text-blue-400

                  flex
                  items-center
                  justify-center

                  text-xs
                  font-semibold
                  "
                >
                  {index + 1}
                </div>

                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {module}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action */}

      <button
        onClick={() => onToggleSheet(sheet.name)}
        className={`
        mt-8

        w-full

        py-3

        rounded-xl

        font-semibold

        transition-all

        ${
          active
            ? `
              bg-red-50
              hover:bg-red-100

              text-red-600

              dark:bg-red-900/20
              dark:text-red-400
              dark:hover:bg-red-900/30
            `
            : `
              bg-blue-600
              hover:bg-blue-700

              text-white
            `
        }
        `}
      >
        {active ? "Deactivate Sheet" : "Activate Sheet"}
      </button>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div
    className="
    rounded-2xl

    p-4

    bg-slate-50
    dark:bg-slate-800
    "
  >
    <div
      className="
      flex
      items-center
      gap-2

      text-slate-500
      dark:text-slate-400
      "
    >
      {icon}

      <span className="text-sm">{title}</span>
    </div>

    <p
      className="
      mt-2

      font-bold

      text-lg

      text-slate-900
      dark:text-white
      "
    >
      {value}
    </p>
  </div>
);

export default SheetCard;
