import { CheckCircle } from "lucide-react";

const ResumeStrengths = ({
  strengths,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-green-200
      dark:border-green-900

      rounded-3xl
      p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle
          size={24}
          className="text-green-600"
        />

        <h2
          className="
          text-2xl
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          Strengths
        </h2>
      </div>

      <div className="space-y-4">
        {strengths?.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <CheckCircle
                size={18}
                className="
                mt-1
                text-green-600
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

export default ResumeStrengths;