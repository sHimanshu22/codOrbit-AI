const SheetSelector = ({
  selectedSheet,
  setSelectedSheet,
  sheets,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {(sheets || []).map((sheet) => (
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
          font-medium
          transition-all
          duration-200

          ${
            selectedSheet === sheet
              ? `
                bg-blue-600
                text-white
                border-blue-600
                shadow-md
              `
              : `
                bg-white
                dark:bg-slate-900
                text-slate-700
                dark:text-slate-300
                border-slate-200
                dark:border-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-800
              `
          }
        `}
        >
          {sheet}
        </button>
      ))}
    </div>
  );
};

export default SheetSelector;