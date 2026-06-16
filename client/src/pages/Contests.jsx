import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ContestCard from "../components/ContestCard";

import {
  getUpcomingContests,
  getContestAnalytics,
  getContestHistory,
  getRatingHistory,
  getPerformance,
} from "../services/contestService";

import RatingGraph from "../components/RatingGraph";

import ContestPerformance from "../components/ContestPerformance";

import ContestCalendar from "../components/ContestCalendar";

const Contests = () => {
  const [upcoming, setUpcoming] = useState([]);

  const [analytics, setAnalytics] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [ratingHistory, setRatingHistory] = useState([]);

  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingData = await getUpcomingContests();

        const analyticsData = await getContestAnalytics();

        const historyData = await getContestHistory();

        const ratingHistoryData = await getRatingHistory();

        const performanceData = await getPerformance();

        setPerformance(performanceData.performance);

        setUpcoming(upcomingData.contests);

        setAnalytics(analyticsData.analytics);

        setHistory(historyData.history);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Contest Center</h1>

      {performance && (
        <div className="mb-8">
          <ContestPerformance performance={performance} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ContestCalendar contests={upcoming} />

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Contests</h2>

          <div className="space-y-4">
            {upcoming.map((contest) => (
              <ContestCard key={contest.name} contest={contest} />
            ))}
          </div>
        </div>
      </div>

      {/* Analytics */}

      <h2 className="text-2xl font-semibold mb-4">Contest Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Total Contests</h3>
          <p className="text-2xl font-bold">{analytics?.totalContests ?? 0}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Best Rank</h3>
          <p className="text-2xl font-bold">{analytics?.bestRank ?? "N/A"}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Average Rank</h3>
          <p className="text-2xl font-bold">
            {analytics?.averageRank ?? "N/A"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Highest Gain</h3>
          <p className="text-2xl font-bold">
            {analytics?.highestRatingGain ?? "N/A"}
          </p>
        </div>
      </div>

      <RatingGraph data={ratingHistory} />

      {/* History */}

      <h2 className="text-2xl font-semibold mb-4 mt-4">Contest History</h2>

      {history.length === 0 ? (
        <div className="bg-white p-5 rounded-xl shadow">
          No contests participated yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Contest</th>

                <th className="p-3 text-left">Rank</th>

                <th className="p-3 text-left">Rating Change</th>

                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((contest) => (
                <tr key={contest.contestName}>
                  <td className="p-3">{contest.contestName}</td>

                  <td className="p-3">{contest.rank}</td>

                  <td className="p-3">{contest.ratingChange}</td>

                  <td className="p-3">{contest.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Contests;
