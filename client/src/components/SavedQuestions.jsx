const SavedQuestions = ({
  questions,
}) => {

  if (!questions.length) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-bold mb-4">
        ⭐ Saved Questions
      </h2>

      <div className="space-y-3">

        {questions.map(
          (question) => (

            <div
              key={
                question.questionId
              }
              className="border-b pb-2"
            >
              <h3 className="font-medium">
                {question.title}
              </h3>

              <p className="text-sm text-gray-500">
                {question.topic}
              </p>

              <p className="text-xs text-gray-400">
                {question.sheet}
              </p>
            </div>

          )
        )}

      </div>

    </div>
  );
};

export default SavedQuestions;