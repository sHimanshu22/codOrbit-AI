const OverviewCard = ({
  title,
  value,
  icon,
  description,
}) => {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      p-5
      shadow-sm
      hover:shadow-md
      transition-all
      duration-200
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-900">

            {value}

          </h2>

        </div>

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-blue-50
          flex
          items-center
          justify-center
          "
        >

          {icon}

        </div>

      </div>

      <p className="text-xs text-slate-400 mt-4">

        {description}

      </p>

    </div>
  );
};

export default OverviewCard;