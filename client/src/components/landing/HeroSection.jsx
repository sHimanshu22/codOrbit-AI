import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Zap, Flame, Target } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="
      max-w-7xl
      mx-auto
      px-6
      py-16
      lg:py-20
      "
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}

        <div>
          <span
            className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full

            bg-blue-50
            dark:bg-blue-500/10

            text-blue-600
            dark:text-blue-400

            text-sm
            font-medium
            "
          >
            AI-Powered Developer Growth Platform
          </span>

          <h1
            className="
            text-5xl
            lg:text-7xl
            font-bold
            mt-6
            leading-tight
            tracking-tight

            text-slate-900
            dark:text-white
            "
          >
            Track. Analyze.
            <br />
            Improve.
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              All in One Place.
            </span>
          </h1>

          <p
            className="
            text-lg
            lg:text-xl

            text-slate-600
            dark:text-slate-400

            mt-8
            max-w-xl
            "
          >
            CodOrbit AI helps you track coding progress, master DSA, monitor
            contests, and get AI-powered insights to achieve your dream job.
          </p>

          {/* CTA Buttons */}

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/register"
              className="
              bg-blue-600
              hover:bg-blue-700
              hover:scale-105

              text-white

              px-6
              py-3

              rounded-xl
              font-medium

              transition-all
              duration-300
              "
            >
              Get Started Free
            </Link>

            <a
              href="#showcase"
              className="
              border
              border-slate-300
              dark:border-slate-700

              px-6
              py-3

              rounded-xl
              font-medium

              text-slate-700
              dark:text-slate-300

              hover:bg-slate-50
              dark:hover:bg-slate-900

              transition-all
              "
            >
              View Demo
            </a>
          </div>

          {/* Trust Points */}

          <div
            className="
   flex
  items-center
  gap-8

  mt-6

  text-sm

  text-slate-500
  dark:text-slate-400
  "
          >
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-blue-500" />

              <span>Sync Coding Profiles</span>
            </div>

            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-500" />

              <span>Maintain Coding Streaks</span>
            </div>

            <div className="flex items-center gap-2">
              <Target size={16} className="text-green-500" />

              <span>Placement-Focused Learning</span>
            </div>
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

          shadow-lg
          dark:shadow-none
          "
        >
          {/* Developer Score */}

          <div
            className="
            bg-blue-600
            rounded-2xl
            p-6
            text-white
            "
          >
            <p className="text-blue-100 text-sm">Developer Score</p>

            <h3 className="text-5xl font-bold mt-2">82</h3>

            <p className="mt-2 text-blue-100">Placement Ready</p>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-4 mt-5">
            {[
              {
                label: "GitHub Repos",
                value: "24",
              },
              {
                label: "LeetCode",
                value: "320",
              },
              {
                label: "CF Rating",
                value: "1450",
              },
              {
                label: "Active Streak",
                value: "18",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="
                bg-slate-50
                dark:bg-slate-800

                border
                border-slate-100
                dark:border-slate-700

                rounded-2xl
                p-4
                "
              >
                <p
                  className="
                  text-sm

                  text-slate-500
                  dark:text-slate-400
                  "
                >
                  {item.label}
                </p>

                <h4
                  className="
                  text-2xl
                  font-bold
                  mt-2

                  text-slate-900
                  dark:text-white
                  "
                >
                  {item.value}
                </h4>
              </div>
            ))}
          </div>

          {/* AI Coach */}

          <div
            className="
            mt-5

            rounded-2xl

            bg-green-50
            dark:bg-green-500/10

            border
            border-green-200
            dark:border-green-900

            p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                h-10
                w-10

                rounded-xl

                bg-green-100
                dark:bg-green-500/20

                flex
                items-center
                justify-center
                "
              >
                <Brain
                  size={20}
                  className="
                  text-green-700
                  dark:text-green-400
                  "
                />
              </div>

              <div>
                <p
                  className="
                  font-semibold

                  text-green-700
                  dark:text-green-400
                  "
                >
                  AI Coach
                </p>

                <p
                  className="
                  text-xs

                  text-slate-500
                  dark:text-slate-400
                  "
                >
                  Personalized Recommendation
                </p>
              </div>
            </div>

            <p
              className="
              text-sm
              mt-4

              text-slate-600
              dark:text-slate-300
              "
            >
              Focus on Dynamic Programming and Graphs to improve placement
              readiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
