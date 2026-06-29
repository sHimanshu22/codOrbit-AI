import {
  CheckCircle2,
  BarChart3,
  Trophy,
  Brain,
  GitBranch,
} from "lucide-react";

import dashboardLight from "../../assets/dashboard-light.png";
import dashboardDark from "../../assets/dashboard-dark.png";

const features = [
  "Unified dashboard across multiple coding platforms",
  "AI-powered Developer Score and personalized insights",
  "Track DSA sheets and placement preparation",
  "Contest history, ratings and performance analytics",
  "Resume Analysis with ATS scoring",
];

const DashboardShowcase = () => {
  return (
    <section
      id="showcase"
      className="
      max-w-7xl
      mx-auto
      px-6
      py-24
      "
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}

        <div>
          <p className="text-blue-600 font-medium">Product Overview</p>

          <h2
            className="
            text-4xl
            lg:text-5xl
            font-bold
            mt-4
            text-slate-900
            dark:text-white
            "
          >
            Everything You Need,
            <br />
            In One Place.
          </h2>

          <p
            className="
  mt-6
  text-lg
  leading-8
  text-slate-500
  dark:text-slate-400
  "
          >
            Stop switching between GitHub, LeetCode, Codeforces, CodeChef and
            spreadsheets. CodOrbit brings all your coding activity into one
            intelligent dashboard so you can track progress, prepare for
            placements and improve consistently.
          </p>

          <div className="mt-10 space-y-5">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-500" />

                <span
                  className="
                  text-slate-700
                  dark:text-slate-300
                  "
                >
                  {item}
                </span>

                
              </div>

              
            ))}
          </div>
        </div>

        {/* Right */}

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
          "
        >
          {/* Feature Preview */}

          <div className="grid grid-cols-2 gap-4">
            <div
              className="
              h-28
              rounded-2xl
              bg-blue-50
              dark:bg-blue-900/20
              p-4
              "
            >
              <BarChart3 className="text-blue-600" />

              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                Analytics
              </p>
            </div>

            <div
              className="
              h-28
              rounded-2xl
              bg-green-50
              dark:bg-green-900/20
              p-4
              "
            >
              <Trophy className="text-green-600" />

              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                Contests
              </p>
            </div>

            <div
              className="
              h-28
              rounded-2xl
              bg-purple-50
              dark:bg-purple-900/20
              p-4
              "
            >
              <GitBranch className="text-purple-600" />

              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                GitHub
              </p>
            </div>

            <div
              className="
              h-28
              rounded-2xl
              bg-orange-50
              dark:bg-orange-900/20
              p-4
              "
            >
              <Brain className="text-orange-600" />

              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                AI Coach
              </p>
            </div>
          </div>

          {/* Screenshot */}

          <div
            className="
            mt-6
            rounded-2xl
            overflow-hidden
            border
            border-slate-200
            dark:border-slate-700
            "
          >
            {/* Light Mode Screenshot */}
            <img
              src={dashboardLight}
              alt="CodOrbit Dashboard Light"
              className="
              block
              dark:hidden
              w-full
              h-auto
              "
            />

            {/* Dark Mode Screenshot */}
            <img
              src={dashboardDark}
              alt="CodOrbit Dashboard Dark"
              className="
              hidden
              dark:block
              w-full
              h-auto
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
