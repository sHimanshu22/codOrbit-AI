const AICoachCard = ({
  coach,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">

        🤖 AI DSA Coach

      </h2>

      <p>
        <strong>Stage:</strong>
        {" "}
        {coach.title}
      </p>

      <p>
        <strong>Completion:</strong>
        {" "}
        {coach.completion}%
      </p>

      <p>
        <strong>Readiness:</strong>
        {" "}
        {coach.readiness}
      </p>

      <p className="mt-3">
        <strong>
          Weak Topics:
        </strong>
        {" "}
        {coach.weakTopics.join(
          ", "
        )}
      </p>

      <div className="mt-4 p-4 bg-blue-50 rounded">

        💡
        {" "}
        {
          coach.recommendation
        }

      </div>

    </div>

  );
};

export default AICoachCard;