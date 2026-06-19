import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer
      className="
      border-t
      border-slate-200
      dark:border-slate-800

      py-10
      px-6
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto

        flex
        flex-col
        md:flex-row

        justify-between
        gap-8
        "
      >
        <div>
          <h3
            className="
            text-xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            CodOrbit AI
          </h3>

          <p
            className="
            mt-2
            text-slate-500
            dark:text-slate-400
            "
          >
            Developer Growth Platform
          </p>
        </div>

        <div className="flex gap-10">
          <div>
            <h4 className="font-semibold mb-3">
              Product
            </h4>

            <div className="space-y-2">
              <a href="#features">Features</a>
              <br />
              <a href="#showcase">Demo</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Account
            </h4>

            <div className="space-y-2">
              <Link to="/login">Login</Link>
              <br />
              <Link to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
        mt-10
        text-center

        text-sm
        text-slate-500
        "
      >
        © 2026 CodOrbit AI. All rights reserved.
      </div>
    </footer>
  );
};

export default LandingFooter;