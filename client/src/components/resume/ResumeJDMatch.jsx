import { Target } from "lucide-react";

const ResumeJDMatch = ({
  jdMatch,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-purple-200
      dark:border-purple-900

      rounded-3xl
      p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <Target
          size={24}
          className="text-purple-600"
        />

        <h2
          className="
          text-2xl
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          JD Match
        </h2>
      </div>

      {!jdMatch?.enabled ? (
        <p
          className="
          text-slate-500
          dark:text-slate-400
          "
        >
          No Job Description provided.
        </p>
      ) : (
        <>
          <div className="mb-6">
            <span
              className="
              text-5xl
              font-bold

              text-purple-600
              "
            >
              {jdMatch.matchPercentage}%
            </span>

            <p
              className="
              mt-2

              text-slate-500
              dark:text-slate-400
              "
            >
              Resume Match Score
            </p>
          </div>

          {/* Matched Skills */}

          <div>
            <h3
              className="
              font-semibold
              mb-3

              text-slate-900
              dark:text-white
              "
            >
              Matched Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {jdMatch.matchedSkills?.map(
                (skill) => (
                  <span
                    key={skill}
                    className="
                    px-3
                    py-1

                    rounded-full

                    bg-green-100
                    dark:bg-green-900/30

                    text-green-700
                    dark:text-green-300

                    text-sm
                    "
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Missing Skills */}

          <div className="mt-6">
            <h3
              className="
              font-semibold
              mb-3

              text-slate-900
              dark:text-white
              "
            >
              Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {jdMatch.missingSkills?.map(
                (skill) => (
                  <span
                    key={skill}
                    className="
                    px-3
                    py-1

                    rounded-full

                    bg-red-100
                    dark:bg-red-900/30

                    text-red-700
                    dark:text-red-300

                    text-sm
                    "
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeJDMatch;