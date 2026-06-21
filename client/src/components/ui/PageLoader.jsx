import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

const PageLoader = () => {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      min-h-[60vh]
      "
    >
      {/* Logo */}

      <div className="animate-pulse">
        <img
          src={logoLight}
          alt="CodOrbit"
          className="
          h-24
          w-24
          object-contain
          dark:hidden
          "
        />

        <img
          src={logoDark}
          alt="CodOrbit"
          className="
          h-24
          w-24
          object-contain
          hidden
          dark:block
          "
        />
      </div>

      <h2
        className="
        mt-6
        text-xl
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Building Your Developer Orbit
      </h2>

      <p
        className="
        text-slate-500
        dark:text-slate-400
        mt-2
        "
      >
        Preparing your developer data...
      </p>
    </div>
  );
};

export default PageLoader;