import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnalytics } from "../services/analyticsService";

import GitHubLanguageChart from "../components/GitHubLanguageChart";

import LeetCodeDifficultyChart from "../components/LeetCodeDifficultyChart";

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
    return <DashboardLayout>Loading...</DashboardLayout>;
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

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GitHubLanguageChart data={analytics.github.languages} />

        <LeetCodeDifficultyChart data={leetcodeData} />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
