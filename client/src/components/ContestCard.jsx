import ContestCountdown from "./ContestCountdown";

const ContestCard = ({
  contest,
}) => {

  const start =
    new Date(contest.startTime);

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
      hover:shadow-md
      transition-all
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-semibold text-lg">

            {contest.name}

          </h3>

          <p className="text-slate-500">

            {contest.platform}

          </p>

        </div>

        <span
          className="
          px-3
          py-1
          rounded-full
          bg-blue-50
          text-blue-700
          text-xs
          "
        >

          Upcoming

        </span>

      </div>

      <div className="mt-4">

        <p className="text-sm text-slate-500">

          Starts

        </p>

        <p className="font-medium">

          {start.toLocaleString()}

        </p>

      </div>

      <div
        className="
        mt-4
        p-3
        rounded-xl
        bg-green-50
        "
      >

        ⏳
        {" "}
        <ContestCountdown
          startTime={
            contest.startTime
          }
        />

      </div>

    </div>

  );
};

export default ContestCard;