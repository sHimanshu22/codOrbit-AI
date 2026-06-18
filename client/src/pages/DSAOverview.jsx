import { useEffect, useState } from "react";

import PageLoader from "../components/ui/PageLoader";

import DashboardLayout from "../layouts/DashboardLayout";

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
      }
      finally{
        setLoading(false)
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
        <p className="text-slate-500 text-sm">DSA Preparation</p>

        <h1 className="text-4xl font-bold text-slate-900">DSA Overview</h1>

        <p className="text-slate-500 mt-2">
          Track your preparation across all active sheets
        </p>
      </div>

      <div className="mt-12">
        <SectionHeader
          title="Overall Progress"
          subtitle="Combined progress across all active sheets"
        />

        <div
          className="
    bg-white
    border
    border-slate-200
    rounded-3xl
    p-8
    shadow-sm
    mt-6
    "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Completion</p>

              <h2 className="text-6xl font-bold mt-2">
                {overview.overallPercentage}%
              </h2>
            </div>

            <div className="text-right">
              <p className="text-slate-500">Questions Solved</p>

              <h3 className="text-3xl font-bold mt-2">
                {overview.totalSolved}

                <span className="text-slate-400">
                  /{overview.totalQuestions}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>

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
