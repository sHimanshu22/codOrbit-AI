import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageLoader from "../components/ui/PageLoader";

import { getAnalytics } from "../services/analyticsService";

import GitHubLanguageChart from "../components/GitHubLanguageChart";

import LeetCodeDifficultyChart from "../components/LeetCodeDifficultyChart";

import PlatformComparisonChart from "../components/PlatformComparisonChart";

import ScoreCard from "../components/ScoreCard";

import SectionHeader from "../components/ui/SectionHeader";

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
      <PageLoader />
    </DashboardLayout>
  );
}

  if (!analytics) {
    return <DashboardLayout>No analytics available.</DashboardLayout>;
  }
  const leetcodeData = [
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
  ];

  const comparisonData = [
    {
      platform: "GitHub Repos",
      value: analytics.github.totalRepos,
    },

    {
      platform: "LeetCode",
      value: analytics.leetcode.total,
    },

    {
      platform: "Codeforces",
      value: analytics.codeforces.rating,
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-10">
        <p className="text-slate-500 text-sm">Developer Intelligence</p>

        <h1 className="text-4xl font-bold text-slate-900">Analytics</h1>

        <p className="text-slate-500 mt-2">
          Understand your coding profile through data
        </p>
      </div>

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

      <div className="mt-12">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <div>

      <SectionHeader
        title="GitHub Analysis"
        subtitle="Technology distribution across repositories"
      />

      <div className="mt-6">

        <GitHubLanguageChart
          data={analytics.github.languages}
        />

      </div>

    </div>

    <div>

      <SectionHeader
        title="DSA Analysis"
        subtitle="Difficulty-wise problem solving"
      />

      <div className="mt-6">

        <LeetCodeDifficultyChart
          data={leetcodeData}
        />

      </div>

    </div>

  </div>

</div>

      <div className="mt-12">
        <SectionHeader
          title="Platform Comparison"
          subtitle="Compare activity across platforms"
        />

        <div className="mt-6">
          <PlatformComparisonChart data={comparisonData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
