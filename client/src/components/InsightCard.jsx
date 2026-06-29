const InsightCard = ({ title, value }) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      px-7
      py-6
      shadow-sm
      "
    >
      <h3 className="text-base text-slate-500 dark:text-slate-400">
        {title}
      </h3>

      <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default InsightCard;