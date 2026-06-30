import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";

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
        <div
          className="
          inline-flex
          items-center
          gap-2

          px-4
          py-2

          rounded-full

          bg-white/15

          text-sm
          font-medium
          "
        >
          <Sparkles size={16} />

          AI-Powered Developer Growth Platform
        </div>

        <h2
          className="
          mt-6

          text-4xl
          lg:text-5xl

          font-bold

          leading-tight
          "
        >
          Build Better.
          <br />
          Track Smarter.
          <br />
          Get Placement Ready.
        </h2>

        <p
          className="
          mt-6

          max-w-2xl
          mx-auto

          text-lg

          text-blue-100

          leading-8
          "
        >
          Connect your coding platforms, monitor DSA progress,
          analyze your resume with AI, track contests and
          measure your developer growth—all from one dashboard.
        </p>

        <Link
          to="/login"
          className="
          inline-flex
          items-center
          justify-center

          mt-10

          px-8
          py-4

          rounded-xl

          bg-white

          text-blue-600

          font-semibold

          hover:scale-105

          transition-all
          duration-300

          shadow-lg
          "
        >
          Continue with Google
        </Link>

        <div
          className="
          mt-4

          flex
          items-center
          justify-center
          gap-2

          text-sm

          text-blue-100
          "
        >
          <ShieldCheck size={16} />

          Secure Google Authentication • Free Forever
        </div>

        <div
          className="
          mt-10

          flex
          flex-wrap
          justify-center

          gap-3
          "
        >
          {[
            "Developer Analytics",
            "DSA Tracker",
            "AI Resume Review",
            "Contest Tracking",
            "AI Career Coach",
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