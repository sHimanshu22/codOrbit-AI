import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import DSAOverviewPageSkeleton from "../components/skeletons/DSAOverviewPageSkeleton";

import { getOverview } from "../services/dsaService";

import SheetProgressCard from "../components/SheetProgressCard";

import SectionHeader from "../components/ui/SectionHeader";

const DSAOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOverview();

        setOverview(data.overview);
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
        <DSAOverviewPageSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          DSA Preparation
        </p>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          DSA Overview
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Track your preparation across all active sheets
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mt-12">
        <SectionHeader
          title="Overall Progress"
          subtitle="Combined progress across all active sheets"
        />

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
          mt-6
          "
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-slate-500 dark:text-slate-400">
                Completion
              </p>

              <h2 className="text-6xl font-bold mt-2 text-blue-600">
                {overview.overallPercentage}%
              </h2>
            </div>

            <div className="text-left md:text-right">
              <p className="text-slate-500 dark:text-slate-400">
                Questions Solved
              </p>

              <h3 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                {overview.totalSolved}

                <span className="text-slate-400 dark:text-slate-500">
                  /{overview.totalQuestions}
                </span>
              </h3>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{
                  width: `${overview.overallPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Progress */}
      <div className="mt-12">
        <SectionHeader
          title="Learning Tracks"
          subtitle="Progress across your active DSA sheets"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {overview.sheetStats.map((sheet) => (
            <SheetProgressCard
              key={sheet.sheet}
              sheet={sheet.sheet}
              solved={sheet.solved}
              total={sheet.total}
              percentage={sheet.percentage}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DSAOverview;