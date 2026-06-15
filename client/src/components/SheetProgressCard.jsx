const SheetProgressCard = ({
  sheet,
  solved,
  total,
  percentage,
}) => {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="font-semibold">

        {sheet}

      </h3>

      <p className="mt-2">

        {solved}/{total}
      </p>

      <p className="text-2xl font-bold">

        {percentage}%
      </p>

    </div>
  );
};

export default SheetProgressCard;