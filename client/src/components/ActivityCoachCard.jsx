const ActivityCoachCard = ({
  coach,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        🤖 AI Activity Coach

      </h2>

      <p>
        Coding Activity:
        {" "}
        {coach.codingTotal}
      </p>

      <p>
        Development Activity:
        {" "}
        {coach.githubTotal}
      </p>

      <p>
        Trend:
        {" "}
        {coach.trend}
      </p>

      <div className="mt-4 p-4 bg-green-50 rounded">

        💡
        {" "}
        {
          coach.recommendation
        }

      </div>

    </div>
  );
};

export default ActivityCoachCard;