import ContestCountdown from "./ContestCountdown";

const ContestCard = ({ contest }) => {
  const start = new Date(contest.startTime);

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold text-lg">{contest.name}</h3>

      <p className="text-gray-600">{contest.platform}</p>

      <p className="mt-2">Starts: {start.toLocaleString()}</p>

      <p className="mt-2 font-semibold text-green-600">
        ⏳ Starts In: <ContestCountdown startTime={contest.startTime} />
      </p>
    </div>
  );
};

export default ContestCard;
