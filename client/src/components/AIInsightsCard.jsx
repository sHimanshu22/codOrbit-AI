import {
  Brain,
  TrendingUp,
} from "lucide-react";

const AIInsightsCard = ({
  insights,
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
      <div className="flex items-center gap-3 mb-6">
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
            className="text-blue-600"
          />
        </div>

        <div>
          <h2
            className="
            text-xl
            font-bold
            text-slate-900
            dark:text-slate-100
            "
          >
            AI Career Coach
          </h2>

          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            "
          >
            Personalized insights for your growth
          </p>
        </div>
      </div>

      <div
        className="
        whitespace-pre-wrap
        text-slate-700
        dark:text-slate-300
        leading-8
        "
      >
        {insights}
      </div>

      <div
        className="
        mt-6
        pt-4
        border-t
        border-slate-100
        dark:border-slate-800
        flex
        items-center
        gap-2
        "
      >
        <TrendingUp
          size={18}
          className="text-green-600"
        />

        <span
          className="
          text-sm
          text-slate-500
          dark:text-slate-400
          "
        >
          Updated from your latest coding activity
        </span>
      </div>
    </div>
  );
};

export default AIInsightsCard;