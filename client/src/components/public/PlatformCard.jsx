const PlatformCard = ({
  logo,
  name,
  username,
  url,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="
      flex
      items-center
      gap-4

      p-4

      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl

      hover:border-blue-500
      hover:shadow-md

      transition-all
      "
    >
      <img
        src={logo}
        alt={name}
        className="
        w-10
        h-10
        object-contain
        "
      />

      <div>
        <p
          className="
          font-semibold

          text-slate-900
          dark:text-white
          "
        >
          {name}
        </p>

        <p
          className="
          text-sm

          text-slate-500
          dark:text-slate-400
          "
        >
          {username}
        </p>
      </div>
    </a>
  );
};

export default PlatformCard;