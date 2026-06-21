const ProfileStatCard = ({
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

      text-center
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

      <h3
        className="
        mt-2

        text-3xl
        font-bold

        text-slate-900
        dark:text-white
        "
      >
        {value}
      </h3>
    </div>
  );
};

export default ProfileStatCard;