const ContestPerformance = ({
  performance,
}) => {

  const cards = [
    {
      title: "Current Rating",
      value: performance.currentRating,
    },
    {
      title: "Highest Rating",
      value: performance.highestRating,
    },
    {
      title: "Current Rank",
      value: performance.currentRank,
    },
    {
      title: "Highest Rank",
      value: performance.highestRank,
    },
    {
      title: "Total Contests",
      value: performance.totalContests,
    },
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-md
          transition-all
          "
        >

          <p className="text-sm text-slate-500">

            {card.title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {card.value || "N/A"}

          </h2>

        </div>

      ))}

    </div>

  );
};

export default ContestPerformance;