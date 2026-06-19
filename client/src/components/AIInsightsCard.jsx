import { Brain, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

const AIInsightsCard = ({ insights }) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Career Coach
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Personalized insights for your growth
          </p>
        </div>
      </div>

      {/* AI Content */}

      <div
        className="
        prose
        prose-slate
        dark:prose-invert
        max-w-none

        prose-headings:font-bold
        prose-headings:text-slate-900
        dark:prose-headings:text-white

        prose-p:text-slate-700
        dark:prose-p:text-slate-300

        prose-strong:text-slate-900
        dark:prose-strong:text-white

        prose-li:text-slate-700
        dark:prose-li:text-slate-300

        prose-ul:my-4
        prose-ol:my-4

        prose-h1:text-2xl
        prose-h2:text-xl
        prose-h3:text-lg
        "
      >
        <ReactMarkdown>
          {insights}
        </ReactMarkdown>
      </div>

      {/* Footer */}

      <div
        className="
        mt-8
        pt-5
        border-t
        border-slate-200
        dark:border-slate-800
        flex
        items-center
        gap-2
        "
      >
        <TrendingUp
          size={18}
          className="text-green-600 dark:text-green-400"
        />

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Updated from your latest coding activity
        </span>
      </div>
    </div>
  );
};

export default AIInsightsCard;