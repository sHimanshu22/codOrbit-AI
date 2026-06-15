const SheetSelector = ({
  selectedSheet,
  setSelectedSheet,
  sheets,
}) => {
  return (
    <select
      value={selectedSheet}
      onChange={(e) =>
        setSelectedSheet(
          e.target.value
        )
      }
      className="border p-2 rounded"
    >
      {sheets.map(
        (sheet) => (
          <option
            key={sheet}
            value={sheet}
          >
            {sheet}
          </option>
        )
      )}
    </select>
  );
};

export default SheetSelector;