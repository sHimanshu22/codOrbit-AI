import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Circle,
} from "lucide-react";

import leetcodeLogo from "../../assets/platforms/leetcode.svg";
import youtubeLogo from "../../assets/platforms/youtube.svg";

const QuestionRow = ({
  question,
  onToggle,
  onBookmark,
}) => {
  const difficultyStyles = {
    Easy:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",

    Medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",

    Hard:
      "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  };

  const getPlatformLogo = (
    platform
  ) => {
    switch (
      platform?.toLowerCase()
    ) {
      case "leetcode":
        return leetcodeLogo;

      default:
        return null;
    }
  };

  return (
    <div
      className="
      flex
      items-center
      gap-4

      px-4
      py-3

      border-b
      border-slate-100
      dark:border-slate-800

      hover:bg-slate-50
      dark:hover:bg-slate-800/40

      transition
      "
    >
      {/* Solved */}

      <button
        onClick={() =>
          onToggle(question)
        }
        className="shrink-0"
      >
        {question.solved ? (
          <CheckCircle2
            size={22}
            className="text-green-500"
          />
        ) : (
          <Circle
            size={22}
            className="text-slate-400"
          />
        )}
      </button>

      {/* Title */}

      <div className="flex-1 min-w-0">
        <h4
          className="
          text-sm
          md:text-base

          font-medium

          text-slate-900
          dark:text-white

          truncate
          "
        >
          {question.title}
        </h4>
      </div>

      {/* Difficulty / Concept */}

      <div className="w-24 hidden md:flex justify-center">
        {question.isConcept ? (
          <span
            className="
            px-3
            py-1

            rounded-full

            text-xs

            bg-blue-100
            text-blue-700

            dark:bg-blue-900/20
            dark:text-blue-400
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

            ${difficultyStyles[
              question.difficulty
            ]}
            `}
          >
            {question.difficulty}
          </span>
        )}
      </div>

      {/* Platform */}

      <div
        className="
        w-20
        hidden
        lg:flex
        justify-center
        "
      >
        {question.problemUrl ? (
          <a
            href={question.problemUrl}
            target="_blank"
            rel="noreferrer"
            className="
            p-2

            rounded-xl

            bg-slate-100
            dark:bg-slate-800

            hover:scale-105
            hover:bg-slate-200
            dark:hover:bg-slate-700

            transition
            "
          >
            <img
              src={getPlatformLogo(
                question.platform
              )}
              alt={
                question.platform
              }
              className="
              w-5
              h-5
              object-contain
              "
            />
          </a>
        ) : (
          <span className="text-slate-400 text-xs">
            -
          </span>
        )}
      </div>

      {/* Solution */}

      <div
        className="
        w-16
        hidden
        md:flex
        justify-center
        "
      >
        {question.solutionUrl ? (
          <a
            href={
              question.solutionUrl
            }
            target="_blank"
            rel="noreferrer"
            className="
            p-2

            rounded-xl

            bg-slate-100
            dark:bg-slate-800

            hover:scale-105
            hover:bg-slate-200
            dark:hover:bg-slate-700

            transition
            "
          >
            <img
              src={youtubeLogo}
              alt="Solution"
              className="
              w-5
              h-5
              object-contain
              "
            />
          </a>
        ) : (
          <span className="text-slate-400">
            -
          </span>
        )}
      </div>

      {/* Tags */}

      <div
        className="
        hidden
        xl:flex

        items-center
        gap-2

        min-w-[180px]
        "
      >
        {question.tags
          ?.slice(0, 2)
          .map((tag) => (
            <span
              key={tag}
              className="
              px-2
              py-1

              rounded-lg

              text-xs

              bg-slate-100
              dark:bg-slate-800

              text-slate-600
              dark:text-slate-300
              "
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Bookmark */}

      <button
        onClick={() =>
          onBookmark(question)
        }
        className="shrink-0"
      >
        {question.bookmarked ? (
          <BookmarkCheck
            size={22}
            className="text-yellow-500"
          />
        ) : (
          <Bookmark
            size={22}
            className="text-slate-400"
          />
        )}
      </button>
    </div>
  );
};

export default QuestionRow;