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
          Start Your Developer Journey Today
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
          Track coding progress, improve consistency,
          analyze performance and grow with AI-powered
          guidance.
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
          Get Started Free
        </Link>
      </div>
    </section>
  );
};

export default CTASection;