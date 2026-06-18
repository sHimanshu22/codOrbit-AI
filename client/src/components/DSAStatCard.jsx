const DSAStatCard = ({
  title,
  value,
}) => {

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      "
    >

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h2 className="text-4xl font-bold text-slate-900 mt-3">

        {value}

      </h2>

    </div>

  );
};

export default DSAStatCard;