const InsightCard = ({
  title,
  value,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold">

        {title}

      </h3>

      <p className="text-2xl font-bold mt-3">

        {value}

      </p>

    </div>
  );
};

export default InsightCard;