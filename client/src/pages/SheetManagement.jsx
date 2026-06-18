import { useEffect, useState } from "react";

import PageLoader from "../components/ui/PageLoader";

import DashboardLayout from "../layouts/DashboardLayout";

import { getProfile, updateActiveSheets } from "../services/userService";

const SHEETS = [
  {
    name: "Striver A2Z",
    questions: 5,
    description: "Complete DSA roadmap",
  },

  {
    name: "Blind 75",
    questions: 3,
    description: "Top interview questions",
  },

  {
    name: "NeetCode 150",
    questions: 2,
    description: "Placement focused preparation",
  },

  {
    name: "Love Babbar 450",
    questions: 2,
    description: "Comprehensive DSA practice",
  },
];

const SheetManagement = () => {
  const [selectedSheets, setSelectedSheets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getProfile();

        setSelectedSheets(data.user.activeSheets || []);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };

    loadUser();
  }, []);

  const handleCheckbox = (sheet) => {
    if (selectedSheets.includes(sheet)) {
      setSelectedSheets(selectedSheets.filter((s) => s !== sheet));
    } else {
      setSelectedSheets([...selectedSheets, sheet]);
    }
  };

  const handleSave = async () => {
    try {
      await updateActiveSheets(selectedSheets);

      alert("Sheets updated successfully");
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
        <p className="text-slate-500 text-sm">Learning Management</p>

        <h1 className="text-4xl font-bold text-slate-900">DSA Sheets</h1>

        <p className="text-slate-500 mt-2">
          Select the sheets you want to track
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SHEETS.map((sheet) => {
          const active = selectedSheets.includes(sheet.name);

          return (
            <div
              key={sheet.name}
              className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{sheet.name}</h3>

                  <p className="text-slate-500 mt-2">{sheet.description}</p>
                </div>

                <span
                  className={`
          px-3
          py-1
          rounded-full
          text-sm

          ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }
        `}
                >
                  {active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm text-slate-500">Questions</p>

                <p className="text-3xl font-bold mt-1">{sheet.questions}</p>
              </div>

              <button
                onClick={() => handleCheckbox(sheet.name)}
                className={`
        w-full
        mt-6
        py-3
        rounded-xl
        font-medium
        transition-all

        ${active ? "bg-red-50 text-red-600" : "bg-blue-600 text-white"}
      `}
              >
                {active ? "Deactivate" : "Activate"}
              </button>
            </div>
          );
        })}

        <div className="mt-10">
          <button
            onClick={handleSave}
            className="
    bg-blue-600
    text-white
    px-8
    py-3
    rounded-xl
    font-medium
    hover:bg-blue-700
    transition-all
    "
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SheetManagement;
