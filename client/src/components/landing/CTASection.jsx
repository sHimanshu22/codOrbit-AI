import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div
        className="
        max-w-5xl
        mx-auto

        bg-blue-600
        rounded-[32px]

        p-12

        text-center
        text-white
        "
      >
        <h2
          className="
          text-4xl
          lg:text-5xl
          font-bold
          "
        >
          Build Better. Track Smarter. Get Placement Ready.
        </h2>

        <p
          className="
          mt-6
          text-blue-100
          max-w-2xl
          mx-auto
          text-lg
          "
        >
          Connect your coding platforms, monitor DSA progress, analyze your
          resume with AI, track contests and measure your growth—all from one
          dashboard.
        </p>

        <Link
          to="/register"
          className="
          inline-block

          mt-8

          bg-white
          text-blue-600

          px-8
          py-4

          rounded-xl
          font-semibold

          hover:scale-105
          transition-all
          "
        >
          Start Tracking Now
        </Link>

        <div
          className="
  mt-8

  flex
  flex-wrap
  justify-center
  gap-3
  "
        >
          {[
            "Developer Analytics",
            "DSA Tracker",
            "Contest Center",
            "Resume Analysis",
          ].map((item) => (
            <span
              key={item}
              className="
      px-4
      py-2

      rounded-full

      bg-white/15

      text-sm
      font-medium
      "
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
