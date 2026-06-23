import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Layers3,
  Trophy,
  BarChart3,
  UserCircle,
  LogOut,
} from "lucide-react";

import lightLogo from "../../assets/logo-light.png";
import darkLogo from "../../assets/logo-dark.png";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoggedInNavbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "DSA Tracker",
      path: "/dsa-tracker",
      icon: Code2,
    },
    {
      name: "Overview",
      path: "/dsa-overview",
      icon: BookOpen,
    },
    {
      name: "Sheets",
      path: "/sheet-management",
      icon: Layers3,
    },
    {
      name: "Contests",
      path: "/contests",
      icon: Trophy,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  return (
    <header
      className="
      sticky
      top-0
      z-50

      bg-white/90
      dark:bg-slate-950/90

      backdrop-blur-xl

      border-b
      border-slate-200
      dark:border-slate-800
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto

        h-20

        px-6

        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <Link
          to="/"
          className="
          flex
          items-center
          gap-3

          shrink-0

          group
          "
        >
          <img
            src={lightLogo}
            alt="CodOrbit"
            className="
            w-11
            h-11

            dark:hidden

            transition-transform
            duration-200

            group-hover:scale-105
            "
          />

          <img
            src={darkLogo}
            alt="CodOrbit"
            className="
            hidden
            dark:block

            w-11
            h-11

            transition-transform
            duration-200

            group-hover:scale-105
            "
          />

          <div>
            <h1
              className="
              text-2xl
              font-bold

              text-slate-900
              dark:text-white
              "
            >
              CodOrbit
            </h1>

            <p
              className="
              text-xs

              text-slate-500
              dark:text-slate-400
              "
            >
              Developer Growth Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav
          className="
          hidden
          xl:flex

          items-center
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                flex
                items-center
                gap-2

                px-2.5
                py-2.5

                rounded-xl

                text-sm
                font-medium

                transition-all

                ${
                  active
                    ? `
                    bg-blue-600
                    text-white
                    shadow-sm
                    `
                    : `
                    text-slate-600
                    dark:text-slate-300

                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    `
                }
                `}
              >
                <Icon size={18} />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
          inline-flex
          items-center
          gap-2

          px-4
          py-2.5

          rounded-xl

          bg-red-50
          dark:bg-red-900/20

          text-red-600
          dark:text-red-400

          hover:bg-red-100
          dark:hover:bg-red-900/30

          font-medium

          transition-all
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default LoggedInNavbar;
