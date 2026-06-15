const SheetSelector = ({
  selectedSheet,
  setSelectedSheet,
}) => {

  const sheets = [

    "Striver A2Z",

    "Blind 75",

    "NeetCode 150",

    "Love Babbar 450",
  ];

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
          >
            {sheet}
          </option>
        )
      )}
    </select>
  );
};

export default SheetSelector;