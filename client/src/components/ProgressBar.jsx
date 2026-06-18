const ProgressBar = ({
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
      "
    >

      <div className="flex justify-between items-center mb-4">

        <div>

          <h2 className="text-xl font-bold">

            Overall Progress

          </h2>

          <p className="text-slate-500 text-sm">

            Completion of selected sheet

          </p>

        </div>

        <div className="text-3xl font-bold text-blue-600">

          {percentage}%

        </div>

      </div>

      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">

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

  );
};

export default ProgressBar;