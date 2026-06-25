const breakdownMax = {
  structure: 15,
  skills: 15,
  projects: 25,
  experience: 15,
  impact: 15,
  links: 10,
  achievements: 5,
};

const ResumeBreakdown = ({
  breakdown,
}) => {
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
      "
    >
      <h2
        className="
        text-2xl
        font-bold

        text-slate-900
        dark:text-white
        "
      >
        Score Breakdown
      </h2>

      <div className="mt-6 space-y-5">
        {Object.entries(
          breakdown
        ).map(([key, value]) => {
          const percentage =
            (value /
              breakdownMax[key]) *
            100;

          return (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <span
                  className="
                  capitalize

                  text-slate-700
                  dark:text-slate-300
                  "
                >
                  {key}
                </span>

                <span
                  className="
                  font-semibold

                  text-slate-900
                  dark:text-white
                  "
                >
                  {value}/
                  {
                    breakdownMax[
                      key
                    ]
                  }
                </span>
              </div>

              <div
                className="
                h-3

                bg-slate-100
                dark:bg-slate-800

                rounded-full
                overflow-hidden
                "
              >
                <div
                  className="
                  h-full

                  bg-blue-600

                  rounded-full

                  transition-all
                  duration-700
                  "
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeBreakdown;