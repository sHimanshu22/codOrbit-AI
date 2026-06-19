const ScoreCard = ({
  title,
  score,
}) => {

  return (

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      "
    >

      <p className="text-sm text-slate-500 dark:text-slate-400">

        {title}

      </p>

      <div className="mt-3 flex items-end gap-2">

        <h2 className="text-5xl font-bold text-slate-900 dark:text-white">

          {score}

        </h2>

        <span className="text-slate-400 dark:text-slate-500 mb-2">

          /100

        </span>

      </div>

      <div className="mt-4">

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full">

          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

    </div>

  );
};

export default ScoreCard;