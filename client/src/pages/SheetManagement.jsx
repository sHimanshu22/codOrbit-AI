import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import {
  getProfile,
  updateActiveSheets,
} from "../services/userService";

const SHEETS = [
  "Striver A2Z",
  "Blind 75",
  "NeetCode 150",
  "Love Babbar 450",
];

const SheetManagement = () => {

  const [
    selectedSheets,
    setSelectedSheets,
  ] = useState([]);

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const data =
            await getProfile();

          setSelectedSheets(
            data.user.activeSheets || []
          );

        } catch (error) {

          console.error(error);

        }
      };

    loadUser();

  }, []);

  const handleCheckbox =
    (sheet) => {

      if (
        selectedSheets.includes(
          sheet
        )
      ) {

        setSelectedSheets(
          selectedSheets.filter(
            (s) =>
              s !== sheet
          )
        );

      } else {

        setSelectedSheets([
          ...selectedSheets,
          sheet,
        ]);
      }
    };

  const handleSave =
    async () => {

      try {

        await updateActiveSheets(
          selectedSheets
        );

        alert(
          "Sheets updated successfully"
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">

        DSA Sheets

      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        {SHEETS.map(
          (sheet) => (

            <div
              key={sheet}
              className="mb-4"
            >

              <label>

                <input
                  type="checkbox"
                  checked={
                    selectedSheets.includes(
                      sheet
                    )
                  }
                  onChange={() =>
                    handleCheckbox(
                      sheet
                    )
                  }
                />

                <span className="ml-2">

                  {sheet}

                </span>

              </label>

            </div>

          )
        )}

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >

          Save

        </button>

      </div>

    </DashboardLayout>
  );
};

export default SheetManagement;