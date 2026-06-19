const SkillAnalysisCard = ({
  analysis,
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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          🧠 Skill Analysis
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Understand your strongest and weakest areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Strengths */}

        <div
          className="
          bg-green-50
          dark:bg-green-900/20
          rounded-2xl
          p-5
          "
        >
          <h3 className="font-semibold text-green-700 dark:text-green-400 mb-4">
            🚀 Strengths
          </h3>

          <div className="space-y-3">
            {analysis.strengths.map(
              (item) => (
                <div
                  key={item.topic}
                  className="flex justify-between"
                >
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.topic}
                  </span>

                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {item.percentage}%
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Weaknesses */}

        <div
          className="
          bg-red-50
          dark:bg-red-900/20
          rounded-2xl
          p-5
          "
        >
          <h3 className="font-semibold text-red-700 dark:text-red-400 mb-4">
            🎯 Focus Areas
          </h3>

          <div className="space-y-3">
            {analysis.weaknesses.map(
              (item) => (
                <div
                  key={item.topic}
                  className="flex justify-between"
                >
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.topic}
                  </span>

                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {item.percentage}%
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Recommendation */}

      <div
        className="
        mt-6
        p-5
        bg-blue-50
        dark:bg-blue-900/20
        rounded-2xl
        border
        border-blue-100
        dark:border-blue-800
        "
      >
        <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
          💡 AI Recommendation
        </h3>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {analysis.recommendation}
        </p>
      </div>
    </div>
  );
};

export default SkillAnalysisCard;