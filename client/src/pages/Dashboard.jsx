import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import OverviewCard from "../components/OverviewCard";

import { getDashboardOverview } from "../services/dashboardServices.js";

import SyncButton from "../components/SyncButton";

import {
  getStreaks,
  getHeatmap,
  getInsights,
} from "../services/activityService";

import StreakCard from "../components/StreakCard";

import ActivityHeatmap from "../components/ActivityHeatmap";

import ActivityInsights from "../components/ActivityInsights";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [streaks, setStreaks] = useState(null);

  const [heatmap, setHeatmap] = useState(null);

  const [insights, setInsights] = useState(null);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardOverview();
      const streakData = await getStreaks();

      setStreaks(streakData.streaks);

      const heatmapData = await getHeatmap();
      const insightsData = await getInsights();

      setInsights(insightsData.insights);

      setHeatmap(heatmapData);
      setOverview(data.overview);
    } catch (error) {
      console.error(error);
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  console.log("Insights:", insights);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="flex justify-between items-center mb-6">
        <SyncButton onSuccess={fetchDashboard} />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <OverviewCard title="GitHub Repos" value={overview?.githubRepos} />

        <OverviewCard title="GitHub Stars" value={overview?.githubStars} />

        <OverviewCard
          title="LeetCode Solved"
          value={overview?.leetcodeSolved}
        />

        <OverviewCard title="CF Rating" value={overview?.codeforcesRating} />

        <OverviewCard title="Connected" value={overview?.platformsConnected} />
      </div>

      {streaks && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <StreakCard
            title="🔥 Coding Streak"
            current={streaks.coding.current}
            longest={streaks.coding.longest}
          />

          <StreakCard
            title="💻 Development Streak"
            current={streaks.github.current}
            longest={streaks.github.longest}
          />
        </div>
      )}

      {heatmap && (
        <div className="mt-10 space-y-8">
          <ActivityHeatmap title="🔥 Coding Activity" data={heatmap.coding} />

          <ActivityHeatmap
            title="💻 Development Activity"
            data={heatmap.github}
          />
        </div>
      )}

      {insights && (
        <div className="mt-10">
          <ActivityInsights insights={insights} />
        </div>
      )}
    </DashboardLayout>
  );
};
export default Dashboard;
