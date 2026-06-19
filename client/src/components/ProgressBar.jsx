const ProgressBar = ({
  percentage,
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
      shadow-sm
      "
    >

      <div className="flex justify-between items-center mb-4">

        <div>

          <h2
            className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >

            Overall Progress

          </h2>

          <p
            className="
            text-slate-500
            dark:text-slate-400
            text-sm
            "
          >

            Completion of selected sheet

          </p>

        </div>

        <div
          className="
          text-3xl
          font-bold
          text-blue-600
          "
        >

          {percentage}%

        </div>

      </div>

      <div
        className="
        w-full
        h-4
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
          duration-500
          "
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-4 flex justify-between text-sm">

        <span
          className="
          text-slate-500
          dark:text-slate-400
          "
        >
          Started
        </span>

        <span
          className="
          font-medium
          text-slate-700
          dark:text-slate-300
          "
        >
          {percentage}% Complete
        </span>

      </div>

    </div>

  );
};

export default ProgressBar;