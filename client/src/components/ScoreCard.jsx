const ScoreCard = ({
  title,
  score,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold">

        {title}

      </h3>

      <p className="text-4xl font-bold mt-4">

        {score}/100

      </p>

    </div>
  );
};

export default ScoreCard;