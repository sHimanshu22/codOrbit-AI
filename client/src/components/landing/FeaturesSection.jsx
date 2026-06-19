import {
  BarChart3,
  Brain,
  Code2,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Unified Analytics",
    description:
      "Track GitHub, LeetCode and Codeforces performance from one dashboard.",
  },

  {
    icon: Code2,
    title: "DSA Tracker",
    description:
      "Monitor sheet progress, completion percentage and placement readiness.",
  },

  {
    icon: Brain,
    title: "AI Career Coach",
    description:
      "Receive personalized recommendations and learning guidance.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="
      max-w-7xl
      mx-auto
      px-6
      py-24
      "
    >
      <div className="text-center mb-14">
        <p
          className="
          text-blue-600
          font-medium
          "
        >
          Features
        </p>

        <h2
          className="
          text-4xl
          font-bold
          mt-3
          text-slate-900
          dark:text-white
          "
        >
          Everything You Need
        </h2>

        <p
          className="
          mt-4
          text-slate-500
          dark:text-slate-400
          max-w-2xl
          mx-auto
          "
        >
          A single platform for coding progress,
          analytics and AI-powered improvement.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
              bg-white
              dark:bg-slate-900

              border
              border-slate-200
              dark:border-slate-800

              rounded-3xl
              p-8

              shadow-sm

              hover:shadow-md
              transition-all
              "
            >
              <div
                className="
                h-14
                w-14

                rounded-2xl

                bg-blue-50
                dark:bg-blue-900/20

                flex
                items-center
                justify-center
                "
              >
                <Icon
                  size={28}
                  className="
                  text-blue-600
                  dark:text-blue-400
                  "
                />
              </div>

              <h3
                className="
                text-xl
                font-semibold
                mt-6

                text-slate-900
                dark:text-white
                "
              >
                {feature.title}
              </h3>

              <p
                className="
                mt-3

                text-slate-500
                dark:text-slate-400

                leading-relaxed
                "
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;