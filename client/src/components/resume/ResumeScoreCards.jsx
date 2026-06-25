import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";

const ResumeScoreCards = ({
  analysis,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Resume Score */}

      <div
        className="
        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl
        p-6
        "
      >
        <BarChart3
          size={28}
          className="text-blue-600 mb-4"
        />

        <p className="text-slate-500 dark:text-slate-400">
          Resume Score
        </p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {analysis.score}
        </h2>
      </div>

      {/* ATS Score */}

      <div
        className="
        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl
        p-6
        "
      >
        <TrendingUp
          size={28}
          className="text-green-600 mb-4"
        />

        <p className="text-slate-500 dark:text-slate-400">
          ATS Score
        </p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {analysis.atsScore}
        </h2>
      </div>

      {/* Grade */}

      <div
        className="
        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl
        p-6
        "
      >
        <Award
          size={28}
          className="text-yellow-500 mb-4"
        />

        <p className="text-slate-500 dark:text-slate-400">
          Grade
        </p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {analysis.grade}
        </h2>
      </div>

      {/* JD Match */}

      <div
        className="
        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl
        p-6
        "
      >
        <Target
          size={28}
          className="text-purple-600 mb-4"
        />

        <p className="text-slate-500 dark:text-slate-400">
          JD Match
        </p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {analysis.jdMatch?.enabled
            ? `${analysis.jdMatch.matchPercentage}%`
            : "--"}
        </h2>
      </div>
    </div>
  );
};

export default ResumeScoreCards;