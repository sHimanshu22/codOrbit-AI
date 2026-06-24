import { useEffect, useState } from "react";

import { GitBranch, Star, Code2, Trophy, Link2 } from "lucide-react";

import PageLoader from "../components/ui/PageLoader";

import DashboardLayout from "../layouts/DashboardLayout";

import OverviewCard from "../components/OverviewCard";

import { getDashboardOverview } from "../services/dashboardServices.js";

import SyncButton from "../components/SyncButton";

import {
  getStreaks,
  getHeatmap,
  getInsights,
  getActivityCoach,
} from "../services/activityService";

import StreakCard from "../components/StreakCard";

import ActivityHeatmap from "../components/ActivityHeatmap";

import ActivityInsights from "../components/ActivityInsights";

import ActivityCoachCard from "../components/ActivityCoachCard";

import { getDeveloperScore } from "../services/aiServices.js";

import DeveloperScoreCard from "../components/DeveloperScoreCard";

import { getAIInsights } from "../services/aiServices.js";

import AIInsightsCard from "../components/AIInsightsCard";

import SectionHeader from "../components/ui/SectionHeader";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [streaks, setStreaks] = useState(null);

  const [heatmap, setHeatmap] = useState(null);

  const [insights, setInsights] = useState(null);

  const [activityCoach, setActivityCoach] = useState(null);

  const [developerScore, setDeveloperScore] = useState(null);

  const [aiInsights, setAIInsights] = useState("");

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardOverview();
      const streakData = await getStreaks();

      setStreaks(streakData.streaks);

      const heatmapData = await getHeatmap();
      const insightsData = await getInsights();
      const coachData = await getActivityCoach();

      setInsights(insightsData.insights);

      setActivityCoach(coachData.coach);

      setHeatmap(heatmapData);
      setOverview(data.overview);

      const scoreData = await getDeveloperScore();

      try {
        const aiData = await getAIInsights();

        setAIInsights(aiData.insights);
      } catch {
        setAIInsights("AI insights are currently unavailable.");
      }

      setDeveloperScore({
        score: scoreData.developerScore,

        level: scoreData.level,
      });
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
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  const hasConnectedPlatform = overview?.platformsConnected > 0;

  console.log("Insights:", insights);

  return (
    <DashboardLayout>
      {!hasConnectedPlatform ? (
        <div
          className="
    mb-10

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
            <Link2
              size={40}
              className="
        text-blue-600
        dark:text-blue-400
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
            analytics, developer scores, coding streaks, AI insights and
            personalized growth recommendations.
          </p>

          <div
            className="
      mt-8

      grid
      grid-cols-2
      md:grid-cols-4

      gap-4
      "
          >
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-slate-900 dark:text-white">
                GitHub
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Repositories & Activity
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-slate-900 dark:text-white">
                LeetCode
              </p>

              <p className="text-sm text-slate-500 mt-1">DSA Progress</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-slate-900 dark:text-white">
                Codeforces
              </p>

              <p className="text-sm text-slate-500 mt-1">Competitive Rating</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-slate-900 dark:text-white">
                CodeChef
              </p>

              <p className="text-sm text-slate-500 mt-1">Contest Performance</p>
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
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Welcome back</p>

              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Developer Dashboard
              </h1>
            </div>

            <SyncButton onSuccess={fetchDashboard} />
          </div>
          {developerScore && (
            <div className="mb-10">
              <DeveloperScoreCard
                score={developerScore.score}
                level={developerScore.level}
              />
            </div>
          )}
          {error && (
            <div
              className="
        bg-red-100
        dark:bg-red-900/20
        text-red-700
        dark:text-red-400
        p-3
        rounded-xl
        mb-4
        "
            >
              {error}
            </div>
          )}

          <div className="mt-14">
            <SectionHeader
              title="Performance Overview"
              subtitle="Your coding and development metrics"
            />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
              <OverviewCard
                title="GitHub Repos"
                value={overview?.githubRepos}
                icon={<GitBranch size={20} />}
                description="Public repositories"
              />

              <OverviewCard
                title="GitHub Stars"
                value={overview?.githubStars}
                icon={<Star size={20} />}
                description="Total stars earned"
              />

              <OverviewCard
                title="LeetCode Solved"
                value={overview?.leetcodeSolved}
                icon={<Code2 size={20} />}
                description="Problems solved"
              />

              <OverviewCard
                title="CF Rating"
                value={overview?.codeforcesRating}
                icon={<Trophy size={20} />}
                description="Current rating"
              />

              <OverviewCard
                title="CodeChef Rating"
                value={overview?.codechefRating}
                icon={<Trophy size={20} />}
                description="Current Rating"
              />

              <OverviewCard
                title="Connected"
                value={overview?.platformsConnected}
                icon={<Link2 size={20} />}
                description="Linked platforms"
              />
            </div>
          </div>
          <div className="mt-14">
            <SectionHeader
              title="Consistency"
              subtitle="Track your learning habits"
            />

            {streaks && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <StreakCard
                  title="Coding Streak"
                  current={streaks.coding.current}
                  longest={streaks.coding.longest}
                />

                <StreakCard
                  title="Development Streak"
                  current={streaks.github.current}
                  longest={streaks.github.longest}
                />
              </div>
            )}
          </div>
          <div className="mt-14">
            <SectionHeader
              title="Activity"
              subtitle="Your contributions over the last year"
            />

            {heatmap && (
              <div className="mt-6 space-y-8">
                <ActivityHeatmap
                  title="Coding Activity"
                  data={heatmap.coding}
                  type="coding"
                />

                <ActivityHeatmap
                  title="Development Activity"
                  data={heatmap.github}
                  type="github"
                />
              </div>
            )}
          </div>
          <div className="mt-14">
            <SectionHeader
              title="Insights"
              subtitle="Understand your growth patterns"
            />

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights && <ActivityInsights insights={insights} />}

              {activityCoach && <ActivityCoachCard coach={activityCoach} />}
            </div>
          </div>
          <div className="mt-14">
            <SectionHeader
              title="AI Insights"
              subtitle="Personalized recommendations from CodOrbit AI"
            />

            <div className="mt-6">
              <AIInsightsCard insights={aiInsights} />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};
export default Dashboard;
