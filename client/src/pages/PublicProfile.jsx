import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Copy, Check } from "lucide-react";

import { getPublicProfile } from "../services/profileService";

import githubLogo from "../assets/platforms/github.svg";
import leetcodeLogo from "../assets/platforms/leetcode.svg";
import codeforcesLogo from "../assets/platforms/codeforces.svg";
import gfgLogo from "../assets/platforms/gfg.svg";
import hackerrankLogo from "../assets/platforms/hackerrank.svg";
import codechefLogo from "../assets/platforms/codechef.svg";

import ProfileStatCard from "../components/public/ProfileStatCard";
import PlatformCard from "../components/public/PlatformCard";
import PageLoader from "../components/ui/PageLoader";

import { useTheme } from "../context/ThemeContext.jsx";

import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

const PublicProfile = () => {
  const { username } = useParams();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    solvedQuestions: 0,
    activeSheets: 0,
  });

  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getPublicProfile(username);

      setUser(res.user);

      setStats(res.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const copyProfileLink = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const { theme } = useTheme();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return (
      <div
        className="
        min-h-screen

        bg-slate-50
        dark:bg-slate-950

        flex
        items-center
        justify-center
        "
      >
        <div className="text-center">
          <h1
            className="
            text-4xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            User Not Found
          </h1>

          <p
            className="
            mt-3

            text-slate-500
            dark:text-slate-400
            "
          >
            This profile does not exist.
          </p>
        </div>
      </div>
    );
  }

  const platforms = [
    {
      name: "GitHub",
      username: user.githubUsername,
      logo: githubLogo,
      url: `https://github.com/${user.githubUsername}`,
    },

    {
      name: "LeetCode",
      username: user.leetcodeUsername,
      logo: leetcodeLogo,
      url: `https://leetcode.com/u/${user.leetcodeUsername}`,
    },

    {
      name: "Codeforces",
      username: user.codeforcesUsername,
      logo: codeforcesLogo,
      url: `https://codeforces.com/profile/${user.codeforcesUsername}`,
    },

    {
      name: "GeeksforGeeks",
      username: user.gfgUsername,
      logo: gfgLogo,
      url: `https://www.geeksforgeeks.org/user/${user.gfgUsername}`,
    },

    {
      name: "HackerRank",
      username: user.hackerrankUsername,
      logo: hackerrankLogo,
      url: `https://www.hackerrank.com/${user.hackerrankUsername}`,
    },
    {
      name: "CodeChef",
      username: user.codechefUsername,
      logo: codechefLogo,
      url: `https://www.codechef.com/users/${user.codechefUsername}`,
    },
  ].filter((platform) => platform.username);

  return (
    <div
      className="
      min-h-screen

      bg-slate-50
      dark:bg-slate-950
      "
    >
      {/* Navbar */}

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
  justify-center
  "
        >
          <Link
            to="/"
            className="
  flex
  items-center
  gap-3

  hover:opacity-90

  transition-all
  "
          >
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="CodOrbit"
              className="
    w-11
    h-11
    object-contain
    "
            />

            <h1
              className="
    text-3xl
    md:text-4xl

    font-bold

    text-slate-900
    dark:text-white
    "
            >
              CodOrbit
            </h1>
          </Link>
        </div>
      </header>

      <div
        className="
        max-w-6xl
        mx-auto

        px-6
        py-12
        "
      >
        {/* Hero */}

        <div
          className="
          bg-white
          dark:bg-slate-900

          border
          border-slate-200
          dark:border-slate-800

          rounded-3xl

          p-10

          shadow-sm
          "
        >
          <div
            className="
            flex
            flex-col

            items-center
            text-center
            "
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="
                w-28
                h-28

                rounded-full
                object-cover
                "
              />
            ) : (
              <div
                className="
                w-28
                h-28

                rounded-full

                bg-blue-600

                flex
                items-center
                justify-center

                text-white

                text-4xl
                font-bold
                "
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <h1
              className="
              mt-6

              text-4xl
              font-bold

              text-slate-900
              dark:text-white
              "
            >
              {user.name}
            </h1>

            <p
              className="
              mt-2

              text-lg

              text-slate-500
              dark:text-slate-400
              "
            >
              @{user.username}
            </p>

            {(user.branch || user.college) && (
              <p
                className="
                mt-4

                text-slate-600
                dark:text-slate-300
                "
              >
                {user.branch}

                {user.branch && user.college && " • "}

                {user.college}
              </p>
            )}

            <button
              onClick={copyProfileLink}
              className="
              mt-6

              inline-flex
              items-center
              gap-2

              px-5
              py-3

              rounded-xl

              bg-blue-600
              hover:bg-blue-700

              text-white

              transition-all
              "
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}

              {copied ? "Copied" : "Copy Profile Link"}
            </button>
          </div>
        </div>

        {/* Statistics */}

        <div className="mt-10">
          <h2
            className="
            text-2xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            CodOrbit Statistics
          </h2>

          <div
            className="
            mt-5

            grid
            md:grid-cols-2

            gap-5
            "
          >
            <ProfileStatCard
              title="Solved Questions"
              value={stats.solvedQuestions}
            />

            <ProfileStatCard title="Active Sheets" value={stats.activeSheets} />
          </div>
        </div>

        {/* Platforms */}

        {platforms.length > 0 && (
          <div className="mt-12">
            <h2
              className="
              text-2xl
              font-bold

              text-slate-900
              dark:text-white
              "
            >
              Developer Platforms
            </h2>

            <p
              className="
  mt-2
  text-sm
  text-slate-500
  dark:text-slate-400
  "
            >
              Connected profiles are self-reported by users.
            </p>

            <div
              className="
              mt-5

              grid
              md:grid-cols-2

              gap-4
              "
            >
              {platforms.map((platform) => (
                <PlatformCard key={platform.name} {...platform} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
