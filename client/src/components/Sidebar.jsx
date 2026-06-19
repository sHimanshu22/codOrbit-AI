import {
  LayoutDashboard,
  BarChart3,
  Code2,
  Trophy,
  BookOpen,
  Layers3,
  Settings,
  Flame,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "DSA Tracker",
      path: "/dsa-tracker",
      icon: Code2,
    },
    {
      name: "Contests",
      path: "/contests",
      icon: Trophy,
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
      name: "Settings",
      path: "/settings",
      icon: Settings,
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
        <h1
          className="
          text-2xl
          font-bold
          text-slate-900
          dark:text-slate-100
          "
        >
          CodOrbit
        </h1>

        <p
          className="
          text-sm
          text-slate-500
          dark:text-slate-400
          "
        >
          Developer Growth Platform
        </p>
      </div>

      {/* Navigation */}

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path;

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

      {/* Bottom Card */}

      <div className="mt-5">
        <div
          className="
          bg-blue-50
          dark:bg-slate-800
          border
          border-blue-100
          dark:border-slate-700
          rounded-2xl
          p-4
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame
              size={18}
              className="text-orange-500"
            />

            <span
              className="
              font-semibold
              text-slate-900
              dark:text-slate-100
              "
            >
              Current Streak
            </span>
          </div>

          <p
            className="
            text-3xl
            font-bold
            text-blue-600
            dark:text-blue-400
            "
          >
            4 Days
          </p>

          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            mt-1
            "
          >
            Keep building every day 🚀
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;