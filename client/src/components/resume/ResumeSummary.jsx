const ResumeSummary = ({
  summary,
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
        Resume Summary
      </h2>

      <p
        className="
        mt-4
        leading-7

        text-slate-600
        dark:text-slate-300
        "
      >
        {summary}
      </p>
    </div>
  );
};

export default ResumeSummary;