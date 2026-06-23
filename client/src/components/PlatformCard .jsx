import githubLogo from "../assets/platforms/github.svg";
import leetcodeLogo from "../assets/platforms/leetcode.svg";
import codeforcesLogo from "../assets/platforms/codeforces.svg";
import codechefLogo from "../assets/platforms/codechef.svg";

import { Star } from "lucide-react";

const PlatformCard = ({
  title,
  value,
  subtitle,
  connected = true,
}) => {
  const getLogo = () => {
    switch (title.toLowerCase()) {
      case "github":
        return githubLogo;

      case "leetcode":
        return leetcodeLogo;

      case "codeforces":
        return codeforcesLogo;

      case "codechef":
        return codechefLogo;

      default:
        return null;
    }
  };

  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl

      p-6

      shadow-sm
      hover:shadow-md

      transition-all
      "
    >
      <div className="flex items-center gap-3">
        {getLogo() && (
          <img
            src={getLogo()}
            alt={title}
            className="
            w-8
            h-8
            object-contain
            "
          />
        )}

        <h3
          className="
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          {title}
        </h3>
      </div>

      {connected ? (
        <>
          <h2
            className="
            mt-5

            text-5xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            {value}
          </h2>

          {title === "CodeChef" ? (
            <div
              className="
              mt-3

              flex
              items-center
              gap-2

              text-yellow-500
              "
            >
              <Star
                size={16}
                fill="currentColor"
              />

              <span
                className="
                text-sm
                font-medium
                "
              >
                {subtitle}
              </span>
            </div>
          ) : (
            <p
              className="
              mt-3

              text-sm

              text-slate-500
              dark:text-slate-400
              "
            >
              {subtitle}
            </p>
          )}
        </>
      ) : (
        <>
          <h2
            className="
            mt-5

            text-lg
            font-semibold

            text-slate-400
            dark:text-slate-500
            "
          >
            Not Connected
          </h2>

          <p
            className="
            mt-2

            text-sm

            text-slate-500
            dark:text-slate-400
            "
          >
            Connect account from Profile
          </p>
        </>
      )}
    </div>
  );
};

export default PlatformCard;