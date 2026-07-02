import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ContestCard from "../components/ContestCard";
import ContestPageSkeleton from "../components/skeletons/ContestPageSkeleton";

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
import { Trophy } from "lucide-react";

const Contests = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [performance, setPerformance] = useState(null);

  const statCardClass = `
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-2xl
    p-6
    shadow-sm
  `;

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
        <ContestPageSkeleton />
      </DashboardLayout>
    );
  }

  const hasContestPlatform =
    analytics?.totalContests > 0 || history.length > 0 || performance;

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Competitive Programming
        </p>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Contest Center
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Track contests, ratings and performance
        </p>
      </div>

      {!hasContestPlatform ? (
        <div
          className="
    mt-10

    bg-white
    dark:bg-slate-900

    border
    border-slate-200
    dark:border-slate-800

    rounded-3xl

    p-10

    text-center

    shadow-sm
    "
        >
          <div
            className="
      mx-auto

      w-20
      h-20

      rounded-3xl

      bg-orange-50
      dark:bg-orange-900/20

      flex
      items-center
      justify-center
      "
          >
            <Trophy
              size={40}
              className="
        text-orange-500
        "
            />
          </div>

          <h2
            className="
      mt-6

      text-2xl
      font-bold

      text-slate-900
      dark:text-white
      "
          >
            Connect Contest Platforms
          </h2>

          <p
            className="
      mt-3

      max-w-2xl
      mx-auto

      text-slate-500
      dark:text-slate-400
      "
          >
            Connect your Codeforces and CodeChef accounts to track contest
            history, rating progression, performance analytics, rankings and
            upcoming contests in one place.
          </p>

          <div
            className="
      mt-8

      grid
      md:grid-cols-2

      gap-4

      max-w-xl
      mx-auto
      "
          >
            <div
              className="
        p-5

        rounded-2xl

        border
        border-slate-200
        dark:border-slate-700
        "
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Codeforces
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Ratings, ranks and contest history
              </p>
            </div>

            <div
              className="
        p-5

        rounded-2xl

        border
        border-slate-200
        dark:border-slate-700
        "
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                CodeChef
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Ratings, stars and contest performance
              </p>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/profile")}
            className="
      mt-8

      px-6
      py-3

      rounded-xl

      bg-blue-600
      hover:bg-blue-700

      text-white
      font-medium

      transition-all
      "
          >
            Connect Platforms
          </button>
        </div>
      ) : (
        <>
          {/* Performance */}

          <div className="mt-12">
            <SectionHeader
              title="Performance Overview"
              subtitle="Your competitive programming profile"
            />

            {performance && (
              <div className="mt-6">
                <ContestPerformance performance={performance} />
              </div>
            )}
          </div>

          {/* Upcoming Contests */}

          <div className="mt-12">
            <SectionHeader
              title="Upcoming Contests"
              subtitle="Never miss an upcoming contest"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ContestCalendar contests={upcoming} />

              <div
                className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-3xl
            p-6
            shadow-sm
            "
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Upcoming Contests
                </h2>

                {upcoming.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400">
                    No upcoming contests found.
                  </p>
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className={statCardClass}>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Total Contests
                </p>

                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {analytics?.totalContests ?? 0}
                </p>
              </div>

              <div className={statCardClass}>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Best Rank
                </p>

                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {analytics?.bestRank ?? "N/A"}
                </p>
              </div>

              <div className={statCardClass}>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Average Rank
                </p>

                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {analytics?.averageRank ?? "N/A"}
                </p>
              </div>

              <div className={statCardClass}>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Highest Gain
                </p>

                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {analytics?.highestRatingGain ?? "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Rating Journey */}

          <div className="mt-12">
            <SectionHeader
              title="Rating Journey"
              subtitle="Track your rating growth over time"
            />

            <div className="mt-6">
              <RatingGraph data={ratingHistory} />
            </div>
          </div>

          {/* Contest History */}

          <div className="mt-12">
            <SectionHeader
              title="Contest History"
              subtitle="All contests you've participated in"
            />
          </div>

          {history.length === 0 ? (
            <div
              className="
          mt-6
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-2xl
          p-6
          shadow-sm
          text-slate-500
          dark:text-slate-400
          "
            >
              No contests participated yet.
            </div>
          ) : (
            <div
              className="
          mt-6
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-3xl
          shadow-sm
          overflow-hidden
          "
            >
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="p-4 text-left text-slate-600 dark:text-slate-300">
                      Contest
                    </th>

                    <th className="p-4 text-left text-slate-600 dark:text-slate-300">
                      Rank
                    </th>

                    <th className="p-4 text-left text-slate-600 dark:text-slate-300">
                      Rating Change
                    </th>

                    <th className="p-4 text-left text-slate-600 dark:text-slate-300">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((contest) => (
                    <tr
                      key={contest.contestName}
                      className="
                  border-t
                  border-slate-100
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/50
                  transition-colors
                  "
                    >
                      <td className="p-4 text-slate-900 dark:text-white">
                        {contest.contestName}
                      </td>

                      <td className="p-4 text-slate-900 dark:text-white">
                        {contest.rank}
                      </td>

                      <td className="p-4 text-slate-900 dark:text-white">
                        {contest.ratingChange}
                      </td>

                      <td className="p-4 text-slate-500 dark:text-slate-400">
                        {contest.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default Contests;
