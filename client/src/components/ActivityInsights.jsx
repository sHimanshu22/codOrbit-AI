const ActivityInsights = ({
  insights,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        📊 Activity Insights

      </h2>

      <div className="space-y-2">

        <p>
          Coding Activity This Week:
          {" "}
          {insights.codingWeek}
        </p>

        <p>
          Development Activity This Week:
          {" "}
          {insights.githubWeek}
        </p>

        <p>
          Most Active Coding Day:
          {" "}
          {
            insights.mostActiveCodingDay
          }
        </p>

        <p>
          Most Active Development Day:
          {" "}
          {
            insights.mostActiveGithubDay
          }
        </p>

        <p>
          Consistency:
          {" "}
          {
            insights.consistency
          }
        </p>

      </div>

    </div>
  );
};

export default ActivityInsights;