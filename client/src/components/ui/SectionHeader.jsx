const SectionHeader = ({
  title,
  subtitle,
}) => {
  return (
    <div>
      <h2
        className="
        text-2xl
        font-bold
        text-slate-900
        dark:text-white
        "
      >
        {title}
      </h2>

      <p
        className="
        mt-1
        text-slate-500
        dark:text-slate-400
        "
      >
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;