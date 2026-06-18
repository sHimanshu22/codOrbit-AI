const AIInsightsCard = ({
  insights,
}) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex items-center gap-3 mb-4">

        <span className="text-2xl">
          🤖
        </span>

        <h2 className="text-xl font-bold">
          CodOrbit AI Insights
        </h2>

      </div>

      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">

        {insights}

      </div>

    </div>
  );
};

export default AIInsightsCard;