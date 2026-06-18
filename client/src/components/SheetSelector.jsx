const SheetSelector = ({
  selectedSheet,
  setSelectedSheet,
  sheets,
}) => {

  return (

    <div className="flex flex-wrap gap-3">

      {(sheets || []).map(
        (sheet) => (

          <button
            key={sheet}
            onClick={() =>
              setSelectedSheet(sheet)
            }
            className={`
            px-5
            py-3
            rounded-xl
            border
            transition-all

            ${
              selectedSheet === sheet
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }
          `}
          >

            {sheet}

          </button>

        )
      )}

    </div>

  );
};

export default SheetSelector;