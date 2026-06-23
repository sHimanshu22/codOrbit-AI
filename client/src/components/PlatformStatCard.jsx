const PlatformStatCard = ({
  platform,
  primaryValue,
  primaryLabel,
  secondaryValue,
  secondaryLabel,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-3xl

      p-6

      shadow-sm

      hover:shadow-md

      transition-all
      "
    >
      <div>
        <h3
          className="
          text-lg
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          {platform}
        </h3>

        <p
          className="
          mt-1

          text-sm

          text-slate-500
          dark:text-slate-400
          "
        >
          Connected Platform
        </p>
      </div>

      <div className="mt-6">
        <p
          className="
          text-4xl
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          {primaryValue}
        </p>

        <p
          className="
          mt-1

          text-sm

          text-slate-500
          dark:text-slate-400
          "
        >
          {primaryLabel}
        </p>
      </div>

      {(secondaryValue || secondaryValue === 0) && (
        <div
          className="
          mt-5

          pt-5

          border-t
          border-slate-200
          dark:border-slate-800
          "
        >
          <p
            className="
            text-xl
            font-semibold

            text-blue-600
            dark:text-blue-400
            "
          >
            {secondaryValue}
          </p>

          <p
            className="
            mt-1

            text-sm

            text-slate-500
            dark:text-slate-400
            "
          >
            {secondaryLabel}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlatformStatCard;