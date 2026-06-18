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
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
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
                {
                  question.difficulty
                }
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
          transition
          "
        >

          <CheckCircle2
            size={18}
            className={
              question.solved
                ? "text-green-600"
                : "text-slate-400"
            }
          />

          <span
            className={
              question.solved
                ? "text-green-600 font-medium"
                : "text-slate-500"
            }
          >

            {question.solved
              ? "Solved"
              : "Mark Solved"}

          </span>

        </button>

      </div>

      {question.solvedAt && (

        <div className="mt-4 pt-4 border-t border-slate-100">

          <p className="text-xs text-slate-400">

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