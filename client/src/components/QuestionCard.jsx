const QuestionCard = ({
  question,
  onToggle,
  onBookmark,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">

      <div className="flex items-center gap-3">

        <button
          onClick={() =>
            onBookmark(question)
          }
          className="text-xl"
        >
          {question.bookmarked
            ? "⭐"
            : "☆"}
        </button>

        <div>

          <h3 className="font-semibold">
            {question.title}
          </h3>

          <p className="text-sm text-gray-500">
            {question.topic}
          </p>

        </div>

      </div>

      <input
        type="checkbox"
        checked={
          question.solved
        }
        onChange={() =>
          onToggle(question)
        }
      />

    </div>
  );
};

export default QuestionCard;