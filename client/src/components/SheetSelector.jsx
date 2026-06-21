const SheetSelector = ({
  selectedSheet,
  setSelectedSheet,
  sheets,
}) => {
  return (
    <div
      className="
      grid

      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3

      gap-2
      "
    >
      {(sheets || []).map((sheet) => (
        <button
          key={sheet}
          onClick={() =>
            setSelectedSheet(sheet)
          }
          className={`
        

          px-4
          py-2

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