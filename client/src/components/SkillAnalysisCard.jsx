const SkillAnalysisCard = ({
  analysis,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        🧠 Skill Analysis

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <h3 className="font-semibold text-green-600 mb-2">
            Strengths
          </h3>

          {analysis.strengths.map(
            (item) => (

              <p key={item.topic}>
                ✓ {item.topic}
                {" "}
                ({item.percentage}%)
              </p>

            )
          )}

        </div>

        <div>

          <h3 className="font-semibold text-red-600 mb-2">
            Weaknesses
          </h3>

          {analysis.weaknesses.map(
            (item) => (

              <p key={item.topic}>
                ✗ {item.topic}
                {" "}
                ({item.percentage}%)
              </p>

            )
          )}

        </div>

      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">

        <strong>
          AI Recommendation:
        </strong>

        <p className="mt-2">
          {
            analysis.recommendation
          }
        </p>

      </div>

    </div>
  );
};

export default SkillAnalysisCard;