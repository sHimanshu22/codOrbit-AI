const DSAStatCard = ({
  title,
  value,
}) => {
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
      hover:shadow-md
      transition-all
      duration-300
      "
    >
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
        text-4xl
        font-bold
        text-slate-900
        dark:text-white
        mt-3
        "
      >
        {value}
      </h2>
    </div>
  );
};

export default DSAStatCard;