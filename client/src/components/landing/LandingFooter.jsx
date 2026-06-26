import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer
      className="
      mt-24

      border-t
      border-slate-200
      dark:border-slate-800

      bg-slate-50
      dark:bg-slate-950/50
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto

        px-6
        py-12

        flex
        flex-col
        md:flex-row

        justify-between
        gap-10
        "
      >
        {/* Brand */}

        <div className="max-w-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            CodOrbit AI
          </h3>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            AI-powered Developer Growth Platform helping students track coding
            progress, prepare for placements, and grow consistently.
          </p>
        </div>

        {/* Links */}

        <div className="flex gap-14">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Product
            </h4>

            <div className="flex flex-col gap-3">
              <a
                href="#features"
                className="
                text-slate-600
                dark:text-slate-400

                hover:text-blue-600
                dark:hover:text-blue-400

                transition-colors
                "
              >
                Features
              </a>

              <a
                href="#showcase"
                className="
                text-slate-600
                dark:text-slate-400

                hover:text-blue-600
                dark:hover:text-blue-400

                transition-colors
                "
              >
                Demo
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Account
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="
                text-slate-600
                dark:text-slate-400

                hover:text-blue-600
                dark:hover:text-blue-400

                transition-colors
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                text-slate-600
                dark:text-slate-400

                hover:text-blue-600
                dark:hover:text-blue-400

                transition-colors
                "
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
        border-t
        border-slate-200
        dark:border-slate-800
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto

          px-6
          py-5

          flex
          flex-col
          md:flex-row

          items-center
          justify-between
          gap-3
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 CodOrbit AI. All rights reserved.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Built for Developers ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;