const ContestPerformance = ({
  performance,
}) => {
  const cards = [
    {
      title: "Current Rating",
      value: performance.currentRating,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Highest Rating",
      value: performance.highestRating,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Current Rank",
      value: performance.currentRank,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Highest Rank",
      value: performance.highestRank,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Total Contests",
      value: performance.totalContests,
      color: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-md
          transition-all
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {card.title}
          </p>

          <h2
            className={`text-3xl font-bold mt-3 ${card.color}`}
          >
            {card.value || "N/A"}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ContestPerformance;