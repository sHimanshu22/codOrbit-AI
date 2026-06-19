import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

const LandingNavbar = () => {
  return (
    <header
      className="
      sticky
      top-0
      z-50

      bg-white/80
      dark:bg-slate-950/80

      backdrop-blur-md

      border-b
      border-slate-200
      dark:border-slate-800
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto

        px-6

        h-20

        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <div>
          <h1
            className="
            text-2xl
            font-bold
            flex
            items-center

            text-slate-900
            dark:text-white
            "
          >
            CodOrbit

            <span
              className="
              ml-2
              px-2
              py-1

              rounded-md

              bg-blue-600
              text-white

              text-xs
              font-semibold
              "
            >
              AI
            </span>
          </h1>
        </div>

        {/* Navigation */}

        <nav
          className="
          hidden
          md:flex
          items-center
          gap-8

          text-slate-600
          dark:text-slate-300
          "
        >
          <a
            href="#features"
            className="
            hover:text-blue-600
            transition-colors
            "
          >
            Features
          </a>

          <a
            href="#showcase"
            className="
            hover:text-blue-600
            transition-colors
            "
          >
            How It Works
          </a>
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/login"
            className="
            px-5
            py-2.5

            rounded-xl

            border
            border-slate-300
            dark:border-slate-700

            bg-white
            dark:bg-slate-900

            text-slate-700
            dark:text-slate-300

            font-medium

            hover:bg-slate-50
            dark:hover:bg-slate-800

            transition-all
            duration-200
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
            bg-blue-600
            hover:bg-blue-700

            text-white

            px-5
            py-2.5

            rounded-xl

            font-medium

            transition-all
            duration-200

            hover:shadow-lg
            "
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;