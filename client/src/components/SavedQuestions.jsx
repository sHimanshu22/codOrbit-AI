import { BookmarkCheck, PlayCircle } from "lucide-react";

const SavedQuestions = ({ questions }) => {
  if (!questions.length) {
    return null;
  }

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
        <BookmarkCheck size={22} className="text-yellow-500" />

        <h2
          className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          Saved Questions
        </h2>
      </div>

      <div className="space-y-3">
        {questions.map((question) => (
          <div
            key={question.questionId}
            className="
            flex
            items-center
            justify-between

            p-4

            border
            border-slate-200
            dark:border-slate-800

            rounded-2xl

            bg-slate-50
            dark:bg-slate-800/40

            hover:border-blue-300
            dark:hover:border-blue-500

            transition-all
            "
          >
            <div className="flex-1">
              <h3
                className="
                font-medium
                text-slate-900
                dark:text-white
                "
              >
                {question.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className="
                  px-3
                  py-1

                  rounded-full

                  text-xs
                  font-medium

                  bg-blue-100
                  text-blue-700

                  dark:bg-blue-900/20
                  dark:text-blue-400
                  "
                >
                  {question.module}
                </span>

                <span
                  className="
                  px-3
                  py-1

                  rounded-full

                  text-xs
                  font-medium

                  bg-slate-100
                  dark:bg-slate-700

                  text-slate-600
                  dark:text-slate-300
                  "
                >
                  {question.section}
                </span>

                {question.isConcept ? (
                  <span
                    className="
                    px-3
                    py-1

                    rounded-full

                    text-xs
                    font-medium

                    bg-purple-100
                    text-purple-700

                    dark:bg-purple-900/20
                    dark:text-purple-400
                    "
                  >
                    Concept
                  </span>
                ) : (
                  <span
                    className={`
                    px-3
                    py-1

                    rounded-full

                    text-xs
                    font-medium

                    ${
                      question.difficulty === "Easy"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : question.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    }
                    `}
                  >
                    {question.difficulty}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {/* Problem Link */}

              {question.problemUrl ? (
                <a
                  href={question.problemUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
      text-blue-600
      dark:text-blue-400

      text-sm
      font-medium

      hover:underline
      "
                >
                  {question.platform || "Open"}
                </a>
              ) : (
                <span
                  className="
      text-slate-400
      text-sm
      "
                >
                  -
                </span>
              )}

              {/* Solution */}

              {question.solutionUrl ? (
                <a href={question.solutionUrl} target="_blank" rel="noreferrer">
                  <PlayCircle size={20} className="text-red-500" />
                </a>
              ) : (
                <span
                  className="
      text-slate-400
      text-sm
      "
                >
                  -
                </span>
              )}

              <BookmarkCheck
                size={20}
                className="
    text-yellow-500
    "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuestions;
