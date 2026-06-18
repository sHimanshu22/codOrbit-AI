import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageLoader from "../components/ui/PageLoader";

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
import SectionHeader from "../components/ui/SectionHeader";

const Contests = () => {
  const [upcoming, setUpcoming] = useState([]);

  const [analytics, setAnalytics] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [ratingHistory, setRatingHistory] = useState([]);

  const [performance, setPerformance] = useState(null);

  const statCardClass =
    "bg-white border border-slate-200 rounded-2xl p-6 shadow-sm";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingData = await getUpcomingContests();

        const analyticsData = await getContestAnalytics();

        const historyData = await getContestHistory();

        const ratingHistoryData = await getRatingHistory();

        const performanceData = await getPerformance();

        setRatingHistory(
          ratingHistoryData.history || ratingHistoryData.ratingHistory || [],
        );

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
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-10">
        <p className="text-slate-500 text-sm">Competitive Programming</p>

        <h1 className="text-4xl font-bold text-slate-900">Contest Center</h1>

        <p className="text-slate-500 mt-2">
          Track contests, ratings and performance
        </p>
      </div>
      <div className="mt-12">
        <SectionHeader
          title="Performance Overview"
          subtitle="Your competitive programming profile"
        />
        {performance && (
          <div className="mb-8">
            <ContestPerformance performance={performance} />
          </div>
        )}
      </div>

      <div className="mt-12">
        <SectionHeader
          title="Upcoming Contests"
          subtitle="Never miss an upcoming contest"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ContestCalendar contests={upcoming} />

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Upcoming Contests</h2>

            {upcoming.length === 0 ? (
              <p className="text-slate-500">No upcoming contests found.</p>
            ) : (
              <div className="space-y-4">
                {upcoming.map((contest) => (
                  <ContestCard key={contest.name} contest={contest} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="mt-12">
        <SectionHeader
          title="Contest Analytics"
          subtitle="Historical contest performance"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={statCardClass}>
          <h3>Total Contests</h3>
          <p className="text-2xl font-bold">{analytics?.totalContests ?? 0}</p>
        </div>

        <div className={statCardClass}>
          <h3>Best Rank</h3>
          <p className="text-2xl font-bold">{analytics?.bestRank ?? "N/A"}</p>
        </div>

        <div className={statCardClass}>
          <h3>Average Rank</h3>
          <p className="text-2xl font-bold">
            {analytics?.averageRank ?? "N/A"}
          </p>
        </div>

        <div className={statCardClass}>
          <h3>Highest Gain</h3>
          <p className="text-2xl font-bold">
            {analytics?.highestRatingGain ?? "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <SectionHeader
          title="Rating Journey"
          subtitle="Track your rating growth over time"
        />
        <RatingGraph data={ratingHistory} />
      </div>

      {/* History */}
      <div className="mt-12">
        <SectionHeader
          title="Contest History"
          subtitle="All contests you've participated in"
        />
      </div>

      {history.length === 0 ? (
        <div
          className="bg-white
border
border-slate-200
rounded-2xl
p-6
shadow-sm"
        >
          No contests participated yet.
        </div>
      ) : (
        <div
          className="
  bg-white
  border
  border-slate-200
  rounded-3xl
  shadow-sm
  overflow-hidden
  "
        >
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-3 text-left">Contest</th>

                <th className="p-3 text-left">Rank</th>

                <th className="p-3 text-left">Rating Change</th>

                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((contest) => (
                <tr
                  className="border-t border-slate-100"
                  key={contest.contestName}
                >
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
