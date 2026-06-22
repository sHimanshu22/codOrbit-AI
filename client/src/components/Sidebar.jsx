import {
  LayoutDashboard,
  BarChart3,
  Code2,
  Trophy,
  BookOpen,
  Layers3,
  UserCircle,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";

const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

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
      name: "DSA Overview",
      path: "/dsa-overview",
      icon: BookOpen,
    },

    {
      name: "DSA Sheets",
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
    <aside
      className="
      w-72
      min-h-screen
      bg-white
      dark:bg-slate-900
      border-r
      border-slate-200
      dark:border-slate-800
      px-5
      py-6
      flex
      flex-col
      "
    >
      {/* Logo */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          {/* Light Mode Logo */}
          <img
            src={lightLogo}
            alt="CodOrbit"
            className="w-12 h-12 dark:hidden"
          />

          {/* Dark Mode Logo */}
          <img
            src={darkLogo}
            alt="CodOrbit"
            className="hidden dark:block w-12 h-12"
          />

          <div>
            <h1
              className="
        text-3xl
        font-bold
        leading-none

        text-slate-900
        dark:text-slate-100
        "
            >
              CodOrbit
            </h1>

            <p
              className="
        mt-1

        text-sm

        text-slate-500
        dark:text-slate-400
        "
            >
              Developer Growth Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="space-y-2">
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
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200

              ${
                active
                  ? `
                    bg-blue-50
                    text-blue-600
                    dark:bg-blue-900/30
                    dark:text-blue-400
                    font-medium
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
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={logout}
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl

          text-red-500
          dark:text-red-400

          hover:bg-red-50
          dark:hover:bg-red-500/10

          transition-all
          duration-200
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
