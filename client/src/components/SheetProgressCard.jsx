const SheetProgressCard = ({
  sheet,
  solved,
  total,
  percentage,
}) => {

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">

            {sheet}

          </h3>

          <p className="text-slate-500 mt-1">

            Learning Track

          </p>

        </div>

        <div
          className="
          px-3
          py-1
          rounded-full
          bg-blue-50
          text-blue-700
          text-sm
          font-medium
          "
        >

          {percentage}%

        </div>

      </div>

      <div className="mt-6">

        <div className="flex justify-between mb-2">

          <span className="text-slate-500">

            Progress

          </span>

          <span className="font-medium">

            {solved}/{total}

          </span>

        </div>

        <div
          className="
          w-full
          h-3
          bg-slate-100
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

      </div>

      <div className="mt-5">

        <p className="text-sm text-slate-500">

          Questions Remaining

        </p>

        <p className="font-semibold mt-1">

          {total - solved}

        </p>

      </div>

    </div>

  );
};

export default SheetProgressCard;