import { Lightbulb } from "lucide-react";

const ResumeSuggestions = ({
  suggestions,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-yellow-200
      dark:border-yellow-900

      rounded-3xl
      p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb
          size={24}
          className="text-yellow-500"
        />

        <h2
          className="
          text-2xl
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          Suggestions
        </h2>
      </div>

      <div className="space-y-4">
        {suggestions?.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <Lightbulb
                size={18}
                className="
                mt-1
                text-yellow-500
                flex-shrink-0
                "
              />

              <p
                className="
                text-slate-700
                dark:text-slate-300
                "
              >
                {item}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResumeSuggestions;