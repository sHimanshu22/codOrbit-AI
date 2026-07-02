import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnalytics } from "../services/analyticsService";
import AnalyticsPageSkeleton from "../components/skeletons/AnalyticsPageSkeleton";

import GitHubLanguageChart from "../components/GitHubLanguageChart";

import LeetCodeDifficultyChart from "../components/LeetCodeDifficultyChart";

import ScoreCard from "../components/ScoreCard";

import SectionHeader from "../components/ui/SectionHeader";
import PlatformCard from "../components/PlatformCard ";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalytics();

        setAnalytics(data.analytics);
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
        <AnalyticsPageSkeleton />
      </DashboardLayout>
    );
  }

  const analyticsData = analytics || {};

  const hasConnectedPlatform =
    analytics?.connectedPlatforms?.github ||
    analytics?.connectedPlatforms?.leetcode ||
    analytics?.connectedPlatforms?.codeforces ||
    analytics?.connectedPlatforms?.codechef;

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">Failed to load analytics</div>
      </DashboardLayout>
    );
  }
  const leetcodeData = analytics.leetcode
    ? [
        {
          name: "Easy",
          value: analytics.leetcode.easy,
        },
        {
          name: "Medium",
          value: analytics.leetcode.medium,
        },
        {
          name: "Hard",
          value: analytics.leetcode.hard,
        },
      ]
    : [];

  const comparisonData = [];

  if (analytics.github) {
    comparisonData.push({
      platform: "GitHub",
      value: analytics.github.totalRepos,
    });
  }

  if (analytics.leetcode) {
    comparisonData.push({
      platform: "LeetCode",
      value: analytics.leetcode.total,
    });
  }

  if (analytics.codeforces) {
    comparisonData.push({
      platform: "Codeforces",
      value: analytics.codeforces.rating,
    });
  }

  if (analytics.codechef) {
    comparisonData.push({
      platform: "CodeChef",
      value: analytics.codechef.currentRating,
    });
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-10">
        <p
          className="
          text-slate-500
          dark:text-slate-400
          text-sm
          "
        >
          Developer Intelligence
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          Analytics Dashboard
        </h1>

        <p
          className="
          text-slate-500
          dark:text-slate-400
          mt-2
          "
        >
          Understand your coding profile through data
        </p>
      </div>

      {!hasConnectedPlatform ? (
        <>
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

      bg-blue-50
      dark:bg-blue-900/20

      flex
      items-center
      justify-center
      "
            >
              <svg
                className="w-10 h-10 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-6m3 6V7m3 10v-4m3 8H6a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2z"
                />
              </svg>
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
              Connect Your Coding Platforms
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
              Connect GitHub, LeetCode, Codeforces and CodeChef to unlock
              developer analytics, performance scores, technology insights,
              coding statistics and growth recommendations.
            </p>

            <div
              className="
      mt-8

      grid
      md:grid-cols-4

      gap-4
      "
            >
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  GitHub
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Repository Analytics
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  LeetCode
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  DSA Progress
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Codeforces
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Competitive Rating
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  CodeChef
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Contest Performance
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
        </>
      ) : (
        <>
          {/* Scores */}

          <div className="mt-12">
            <SectionHeader
              title="Performance Scores"
              subtitle="A quick snapshot of your profile"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <ScoreCard
                title="Development Score"
                score={analytics.scores.developmentScore}
              />

              <ScoreCard title="DSA Score" score={analytics.scores.dsaScore} />

              <ScoreCard
                title="CP Score"
                score={analytics.scores.competitiveScore}
              />

              <ScoreCard
                title="Consistency Score"
                score={analytics.scores.consistencyScore}
              />
            </div>
          </div>

          {/* Charts */}

          <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analytics.github && (
                <div>
                  <SectionHeader
                    title="GitHub Analysis"
                    subtitle="Technology distribution across repositories"
                  />

                  <div className="mt-6">
                    <GitHubLanguageChart data={analytics.github.languages} />
                  </div>
                </div>
              )}

              {analytics.leetcode && (
                <div>
                  <SectionHeader
                    title="DSA Analysis"
                    subtitle="Difficulty-wise problem solving"
                  />

                  <div className="mt-6">
                    <LeetCodeDifficultyChart data={leetcodeData} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader
              title="Connected Platforms"
              subtitle="Your synced coding profiles"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <PlatformCard
                title="GitHub"
                connected={analytics.connectedPlatforms?.github}
                value={analytics.github?.totalRepos}
                subtitle="Repositories"
              />

              <PlatformCard
                title="LeetCode"
                connected={analytics.connectedPlatforms?.leetcode}
                value={analytics.leetcode?.total}
                subtitle="Problems Solved"
              />

              <PlatformCard
                title="Codeforces"
                connected={analytics.connectedPlatforms?.codeforces}
                value={analytics.codeforces?.rating}
                subtitle="Current Rating"
              />

              <PlatformCard
                title="CodeChef"
                connected={analytics.connectedPlatforms?.codechef}
                value={analytics.codechef?.currentRating}
                subtitle={analytics.codechef?.stars}
              />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Analytics;
