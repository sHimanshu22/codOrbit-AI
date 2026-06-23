import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageLoader from "../components/ui/PageLoader";

import { getAnalytics } from "../services/analyticsService";

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

        console.log("FULL API RESPONSE:", data);

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
        <PageLoader
          title="Loading Analytics"
          subtitle="Preparing your developer insights..."
        />
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div
          className="
          flex
          items-center
          justify-center
          min-h-[60vh]
          "
        >
          <div
            className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-3xl
            p-8
            shadow-sm
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              text-slate-900
              dark:text-white
              "
            >
              No analytics available
            </h2>

            <p
              className="
              mt-2
              text-slate-500
              dark:text-slate-400
              "
            >
              Connect your coding platforms to generate analytics.
            </p>
          </div>
        </div>
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

      {/* Scores */}

      <div className="mt-12">
        <SectionHeader
          title="Performance Scores"
          subtitle="A quick snapshot of your profile"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <ScoreCard
            title="GitHub Score"
            score={analytics.scores.githubScore}
          />

          <ScoreCard title="DSA Score" score={analytics.scores.dsaScore} />

          <ScoreCard
            title="CP Score"
            score={analytics.scores.competitiveScore}
          />

          <ScoreCard
            title="Overall Score"
            score={analytics.scores.overallScore}
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
            connected={analytics.github?.totalRepos > 0}
            value={analytics.github?.totalRepos}
            subtitle="Repositories"
          />

          <PlatformCard
            title="LeetCode"
            connected={analytics.leetcode?.total > 0}
            value={analytics.leetcode?.total}
            subtitle="Problems Solved"
          />

          <PlatformCard
            title="Codeforces"
            connected={analytics.codeforces?.rating > 0}
            value={analytics.codeforces?.rating}
            subtitle="Current Rating"
          />

          <PlatformCard
            title="CodeChef"
            connected={analytics.codechef?.currentRating > 0}
            value={analytics.codechef?.currentRating}
            subtitle={analytics.codechef?.stars}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
