const TopicAnalytics = ({
  topicStats,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        Topic Progress

      </h2>

      <div className="space-y-4">

        {Object.entries(
          topicStats
        ).map(
          ([topic, stats]) => {

            const percentage =
              Math.round(
                (
                  stats.solved /
                  stats.total
                ) * 100
              );

            return (

              <div
                key={topic}
              >

                <div className="flex justify-between">

                  <span>

                    {topic}

                  </span>

                  <span>

                    {percentage}%

                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-1">

                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                      width:
                        `${percentage}%`,
                    }}
                  />

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>
  );
};

export default TopicAnalytics;