const OverviewCard = ({ title, value, icon, description }) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      p-6
      shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-2
            text-slate-900
            dark:text-white
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
  h-12
  w-12
  rounded-xl
  bg-blue-50
  dark:bg-blue-500/10
  flex
  items-center
  justify-center
  text-blue-600
  dark:text-blue-400
  "
        >
          {icon}
        </div>
      </div>

      <p
        className="
        text-xs
        text-slate-400
        dark:text-slate-500
        mt-4
        "
      >
        {description}
      </p>
    </div>
  );
};

export default OverviewCard;
