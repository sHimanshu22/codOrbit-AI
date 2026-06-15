const DifficultyAnalytics = ({
  difficultyStats,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        Difficulty Progress

      </h2>

      <div className="space-y-4">

        {Object.entries(
          difficultyStats
        ).map(
          ([difficulty, stats]) => (

            <div
              key={difficulty}
            >

              <div className="flex justify-between">

                <span>

                  {difficulty}

                </span>

                <span>

                  {stats.solved}
                  /
                  {stats.total}

                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
};

export default DifficultyAnalytics;