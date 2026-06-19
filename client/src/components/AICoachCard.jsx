import ReactMarkdown from "react-markdown";

import {
  Target,
  AlertTriangle,
  Lightbulb,
  Brain,
  BookOpenCheck,
  CircleCheckBig,
} from "lucide-react";

const AICoachCard = ({ coach }) => {
  const weakTopics = coach?.weakTopics || [];

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
      {/* Header */}

      <div className="flex items-center gap-4 mb-8">
        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-blue-50
          dark:bg-blue-900/20
          flex
          items-center
          justify-center
          "
        >
          <Brain
            size={24}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI DSA Coach
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Personalized guidance for your preparation
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4">
        <div
          className="
          p-4
          rounded-2xl
          bg-slate-50
          dark:bg-slate-800/50
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-blue-600" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Stage
            </span>
          </div>

          <p className="font-semibold text-slate-900 dark:text-white">
            {coach?.title || "Learning"}
          </p>
        </div>

        <div
          className="
          p-4
          rounded-2xl
          bg-slate-50
          dark:bg-slate-800/50
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <CircleCheckBig
              size={16}
              className="text-green-600"
            />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Completion
            </span>
          </div>

          <p className="font-semibold text-slate-900 dark:text-white">
            {coach?.completion ?? 0}%
          </p>
        </div>

        <div
          className="
          p-4
          rounded-2xl
          bg-slate-50
          dark:bg-slate-800/50
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpenCheck
              size={16}
              className="text-purple-600"
            />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Readiness
            </span>
          </div>

          <p className="font-semibold text-slate-900 dark:text-white">
            {coach?.readiness || "In Progress"}
          </p>
        </div>
      </div>

      {/* Weak Topics */}

      <div
        className="
        mt-6
        p-5
        rounded-2xl
        bg-amber-50
        dark:bg-amber-900/20
        border
        border-amber-200
        dark:border-amber-800
        "
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle
            size={18}
            className="text-amber-600 dark:text-amber-400"
          />

          <h3 className="font-semibold text-slate-900 dark:text-white">
            Weak Topics
          </h3>
        </div>

        <p className="text-slate-600 dark:text-slate-300">
          {weakTopics.length > 0
            ? weakTopics.join(", ")
            : "No weak topics detected"}
        </p>
      </div>

      {/* Recommendation */}

      <div
        className="
        mt-4
        p-5
        rounded-2xl
        bg-blue-50
        dark:bg-blue-900/20
        border
        border-blue-200
        dark:border-blue-800
        "
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb
            size={18}
            className="text-blue-600 dark:text-blue-400"
          />

          <h3 className="font-semibold text-slate-900 dark:text-white">
            Recommendation
          </h3>
        </div>

        <div
          className="
          prose
          prose-slate
          dark:prose-invert
          max-w-none

          prose-headings:text-slate-900
          dark:prose-headings:text-white

          prose-p:text-slate-700
          dark:prose-p:text-slate-300

          prose-li:text-slate-700
          dark:prose-li:text-slate-300

          prose-strong:text-slate-900
          dark:prose-strong:text-white
          "
        >
          <ReactMarkdown>
            {coach?.recommendation ||
              "Keep solving problems consistently and focus on improving weak areas."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AICoachCard;