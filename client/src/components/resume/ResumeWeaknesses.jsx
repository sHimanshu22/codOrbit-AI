import { XCircle } from "lucide-react";

const ResumeWeaknesses = ({
  weaknesses,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-red-200
      dark:border-red-900

      rounded-3xl
      p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <XCircle
          size={24}
          className="text-red-600"
        />

        <h2
          className="
          text-2xl
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          Weaknesses
        </h2>
      </div>

      <div className="space-y-4">
        {weaknesses?.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <XCircle
                size={18}
                className="
                mt-1
                text-red-600
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

export default ResumeWeaknesses;