const ProgressBar = ({
  percentage,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Overall Progress
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-5">

        <div
          className="bg-green-500 h-5 rounded-full"
          style={{
            width:
              `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-3 font-semibold">
        {percentage}%
      </p>

    </div>
  );
};

export default ProgressBar;