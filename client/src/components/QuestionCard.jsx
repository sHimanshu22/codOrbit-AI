import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
} from "lucide-react";

const QuestionCard = ({
  question,
  onToggle,
  onBookmark,
}) => {
  const difficultyColors = {
    Easy:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",

    Medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",

    Hard:
      "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  };

  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      p-5
      shadow-sm
      hover:shadow-md
      transition-all
      duration-200
      "
    >
      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="flex items-start gap-4">

          <button
            onClick={() =>
              onBookmark(question)
            }
            className="
            mt-1
            text-slate-500
            dark:text-slate-400
            hover:text-yellow-500
            transition
            "
          >
            {question.bookmarked ? (
              <BookmarkCheck
                size={22}
                className="text-yellow-500"
              />
            ) : (
              <Bookmark size={22} />
            )}
          </button>

          <div>
            <h3
              className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
              "
            >
              {question.title}
            </h3>

            <div className="flex items-center gap-2 mt-2">

              <span
                className="
                px-3
                py-1
                rounded-full
                text-xs
                bg-blue-50
                text-blue-700
                dark:bg-blue-900/20
                dark:text-blue-400
                "
              >
                {question.topic}
              </span>

              <span
                className={`
                px-3
                py-1
                rounded-full
                text-xs
                ${
                  difficultyColors[
                    question.difficulty
                  ]
                }
                `}
              >
                {question.difficulty}
              </span>

            </div>
          </div>

        </div>

        {/* Right */}

        <button
          onClick={() =>
            onToggle(question)
          }
          className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          border-slate-200
          dark:border-slate-700
          hover:bg-slate-50
          dark:hover:bg-slate-800
          transition
          "
        >
          <CheckCircle2
            size={18}
            className={
              question.solved
                ? "text-green-600 dark:text-green-400"
                : "text-slate-400 dark:text-slate-500"
            }
          />

          <span
            className={
              question.solved
                ? "text-green-600 dark:text-green-400 font-medium"
                : "text-slate-500 dark:text-slate-400"
            }
          >
            {question.solved
              ? "Solved"
              : "Mark Solved"}
          </span>

        </button>

      </div>

      {question.solvedAt && (
        <div
          className="
          mt-4
          pt-4
          border-t
          border-slate-100
          dark:border-slate-800
          "
        >
          <p
            className="
            text-xs
            text-slate-400
            dark:text-slate-500
            "
          >
            Solved on{" "}
            {new Date(
              question.solvedAt
            ).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;