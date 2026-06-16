const ContestPerformance = ({
  performance,
}) => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

      <div className="bg-white p-5 rounded-xl shadow">
        <h3>
          Current Rating
        </h3>

        <p className="text-2xl font-bold">
          {
            performance.currentRating
          }
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3>
          Highest Rating
        </h3>

        <p className="text-2xl font-bold">
          {
            performance.highestRating
          }
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3>
          Current Rank
        </h3>

        <p className="text-xl font-bold">
          {
            performance.currentRank
          }
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3>
          Highest Rank
        </h3>

        <p className="text-xl font-bold">
          {
            performance.highestRank
          }
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3>
          Total Contests
        </h3>

        <p className="text-2xl font-bold">
          {
            performance.totalContests
          }
        </p>
      </div>

    </div>

  );
};

export default ContestPerformance;