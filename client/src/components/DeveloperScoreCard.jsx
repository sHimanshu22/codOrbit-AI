const DeveloperScoreCard = ({
  score,
  level,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        🏆 Developer Score

      </h2>

      <div className="text-5xl font-bold">

        {score}

        <span className="text-lg">
          /100
        </span>

      </div>

      <p className="mt-3">

        {level}

      </p>

    </div>
  );
};

export default DeveloperScoreCard;