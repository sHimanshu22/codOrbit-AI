const StreakCard = ({
  title,
  current,
  longest,
}) => {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold">

        {title}

      </h3>

      <div className="mt-4">

        <p className="text-3xl font-bold">

          {current}
        </p>

        <p className="text-gray-500">

          Current Streak
        </p>

      </div>

      <div className="mt-3">

        <p className="text-xl font-semibold">

          {longest}
        </p>

        <p className="text-gray-500">

          Longest Streak
        </p>

      </div>

    </div>
  );
};

export default StreakCard;