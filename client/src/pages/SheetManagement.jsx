import { useEffect, useState } from "react";

import PageLoader from "../components/ui/PageLoader";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProfile, updateActiveSheets } from "../services/userService";
import { getSheets } from "../services/dsaService";
import { MODULE_ORDERS } from "../constants/moduleOrders";

const SheetManagement = () => {
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sheets, setSheets] = useState([]);

  const [expandedSheet, setExpandedSheet] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getProfile();
        setSelectedSheets(data.user.activeSheets || []);

        const sheetsRes = await getSheets();

        setSheets(sheetsRes.sheets);
        console.log(sheetsRes.sheets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const toggleRoadmap = (sheetName) => {
    setExpandedSheet(expandedSheet === sheetName ? null : sheetName);
  };

  const handleSheetToggle = async (sheetName) => {
    try {
      let updatedSheets;

      if (selectedSheets.includes(sheetName)) {
        updatedSheets = selectedSheets.filter((sheet) => sheet !== sheetName);
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
      <div className="mb-10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Learning Management
        </p>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          DSA Sheets
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Select the sheets you want to track
        </p>
      </div>

      <div className="space-y-5 gap-6">
        {sheets.map((sheet) => {
          const active = selectedSheets.includes(sheet.name);

          return (
            <div
              key={sheet.name}
              className="
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-md
              transition-all
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {sheet.name}
                  </h3>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    {sheet.description}
                  </p>
                </div>

                <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-medium

                  ${
                    active
                      ? `
                      bg-green-100
                      text-green-700
                      dark:bg-green-900/20
                      dark:text-green-400
                      `
                      : `
                      bg-slate-100
                      text-slate-600
                      dark:bg-slate-800
                      dark:text-slate-400
                      `
                  }
                  `}
                >
                  {active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Questions
                    </p>

                    <p
                      className="
        text-3xl
        font-bold
        mt-1

        text-slate-900
        dark:text-white
        "
                    >
                      {sheet.questionCount}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Modules
                    </p>

                    <p
                      className="
        text-3xl
        font-bold
        mt-1

        text-slate-900
        dark:text-white
        "
                    >
                      {sheet.moduleCount}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleRoadmap(sheet.name)}
                className="
  w-full

  mt-6
  py-3

  rounded-xl

  border
  border-slate-200
  dark:border-slate-700

  bg-slate-50
  dark:bg-slate-800

  text-slate-700
  dark:text-slate-300

  font-medium

  hover:bg-slate-100
  dark:hover:bg-slate-700

  transition-all
  "
              >
                {expandedSheet === sheet.name ? "Hide Roadmap" : "View Roadmap"}
              </button>

              {expandedSheet === sheet.name && (
                <div
                  className="
    mt-5

    border-t
    border-slate-200
    dark:border-slate-800

    pt-5
    "
                >
                  <p
                    className="
      font-semibold
      mb-4

      text-slate-900
      dark:text-white
      "
                  >
                    Roadmap Modules
                  </p>

                  <div className="space-y-2">
                    {(MODULE_ORDERS[sheet.name] || sheet.modules || []).map(
                      (module, index) => (
                        <div
                          key={module}
                          className="
            flex
            items-center
            gap-3

            text-sm

            text-slate-600
            dark:text-slate-300
            "
                        >
                          <span
                            className="
              w-6
              h-6

              rounded-full

              bg-blue-100
              dark:bg-blue-900/30

              text-blue-600
              dark:text-blue-400

              flex
              items-center
              justify-center

              text-xs
              font-medium
              "
                          >
                            {index + 1}
                          </span>

                          <span>{module}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleSheetToggle(sheet.name)}
                className={`
                w-full
                mt-6
                py-3
                rounded-xl
                font-medium
                transition-all

                ${
                  active
                    ? `
                    bg-red-50
                    text-red-600
                    hover:bg-red-100
                    dark:bg-red-900/20
                    dark:text-red-400
                    dark:hover:bg-red-900/30
                    `
                    : `
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    `
                }
                `}
              >
                {active ? "Deactivate" : "Activate"}
              </button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default SheetManagement;
