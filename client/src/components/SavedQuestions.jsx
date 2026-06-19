import {
  BookmarkCheck,
} from "lucide-react";

const SavedQuestions = ({
  questions,
}) => {

  if (!questions.length)
    return null;

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

        <BookmarkCheck
          size={22}
          className="text-yellow-500"
        />

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

      <div className="space-y-4">

        {questions.map(
          (question) => (

            <div
              key={
                question.questionId
              }
              className="
              border
              border-slate-200
              dark:border-slate-700
              rounded-2xl
              p-4
              bg-slate-50
              dark:bg-slate-800/50
              transition-all
              hover:border-blue-300
              dark:hover:border-blue-500
              "
            >

              <h3
                className="
                font-semibold
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
                  bg-blue-50
                  dark:bg-blue-900/30
                  text-blue-700
                  dark:text-blue-300
                  text-xs
                  font-medium
                  "
                >

                  {question.topic}

                </span>

                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-100
                  dark:bg-slate-700
                  text-slate-600
                  dark:text-slate-300
                  text-xs
                  font-medium
                  "
                >

                  {question.sheet}

                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
};

export default SavedQuestions;