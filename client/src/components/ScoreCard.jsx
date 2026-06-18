const ScoreCard = ({
  title,
  score,
}) => {

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      "
    >

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <div className="mt-3 flex items-end gap-2">

        <h2 className="text-5xl font-bold">

          {score}

        </h2>

        <span className="text-slate-400 mb-2">

          /100

        </span>

      </div>

      <div className="mt-4">

        <div className="w-full bg-slate-100 h-2 rounded-full">

          <div
            className="bg-blue-600 h-2 rounded-full"
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