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
      border
      border-slate-200
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

        <h2 className="text-xl font-bold">

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
              rounded-2xl
              p-4
              "
            >

              <h3 className="font-semibold text-slate-900">

                {question.title}

              </h3>

              <div className="flex gap-2 mt-2">

                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-50
                  text-blue-700
                  text-xs
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
                  text-slate-600
                  text-xs
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