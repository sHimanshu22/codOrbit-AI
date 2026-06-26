import { useEffect, useState } from "react";

import PageLoader from "../components/ui/PageLoader";
import DashboardLayout from "../layouts/DashboardLayout";
import SheetCard from "../components/dsa/SheetCard";

import {
  getProfile,
  updateActiveSheets,
} from "../services/userService";

import { getSheets } from "../services/dsaService";

const SheetManagement = () => {
  const [selectedSheets, setSelectedSheets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sheets, setSheets] = useState([]);

  const [expandedSheet, setExpandedSheet] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, sheetsRes] = await Promise.all([
          getProfile(),
          getSheets(),
        ]);

        setSelectedSheets(profileRes.user.activeSheets || []);

        setSheets(sheetsRes.sheets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleRoadmap = (sheetName) => {
    setExpandedSheet(
      expandedSheet === sheetName ? null : sheetName,
    );
  };

  const handleSheetToggle = async (sheetName) => {
    try {
      let updatedSheets;

      if (selectedSheets.includes(sheetName)) {
        updatedSheets = selectedSheets.filter(
          (sheet) => sheet !== sheetName,
        );
      } else {
        updatedSheets = [...selectedSheets, sheetName];
      }

      setSelectedSheets(updatedSheets);

      await updateActiveSheets(updatedSheets);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Learning Management
        </p>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          DSA Sheets
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Choose the learning roadmaps you want to follow.
          You can activate multiple sheets and switch between
          them anytime from the DSA Tracker.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sheets.map((sheet) => (
          <SheetCard
            key={sheet.name}
            sheet={sheet}
            active={selectedSheets.includes(sheet.name)}
            expanded={expandedSheet === sheet.name}
            onToggleRoadmap={toggleRoadmap}
            onToggleSheet={handleSheetToggle}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SheetManagement;