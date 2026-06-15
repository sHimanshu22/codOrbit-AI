import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import {
  getOverview,
} from "../services/dsaService";

import SheetProgressCard
from "../components/SheetProgressCard";

const DSAOverview = () => {

  const [overview,
    setOverview] =
    useState(null);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const data =
            await getOverview();

          setOverview(
            data.overview
          );

        } catch (error) {

          console.error(error);

        }
      };

    fetchData();

  }, []);

  if (!overview) {

    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">

        DSA Overview

      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-xl font-semibold">

          Overall Progress

        </h2>

        <p className="text-4xl font-bold mt-3">

          {overview.overallPercentage}%

        </p>

        <p>

          {overview.totalSolved}
          /
          {overview.totalQuestions}
          Solved

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {overview.sheetStats.map(
          (sheet) => (

            <SheetProgressCard
              key={
                sheet.sheet
              }

              sheet={
                sheet.sheet
              }

              solved={
                sheet.solved
              }

              total={
                sheet.total
              }

              percentage={
                sheet.percentage
              }
            />

          )
        )}

      </div>

    </DashboardLayout>
  );
};

export default DSAOverview;