import { LogOut, User } from "lucide-react";

import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ui/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <header
      className="
  h-20
  bg-white
  dark:bg-slate-900

  border-b
  border-slate-200
  dark:border-slate-800

  px-8
  flex
  items-center
  justify-between
  "
    >
      {/* Left Side */}

      <div>
        <p
          className="
  text-sm
  text-slate-500
  dark:text-slate-400
  "
        >
          Welcome back
        </p>

        <h2
          className="
  font-semibold
  text-slate-900
  dark:text-slate-100
  "
        >
          Today is a great day to build
        </h2>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>

        <div
          className="
  flex
  items-center
  gap-3
  px-4
  py-2
  rounded-xl

  bg-slate-100
  dark:bg-slate-800

  text-slate-900
  dark:text-slate-100
  "
        >
          <User size={18} />

          <span>Developer</span>
        </div>

        <button
          onClick={logout}
          className="
  flex
  items-center
  gap-2
  px-4
  py-2
  rounded-xl

  bg-red-50
  dark:bg-red-950/40

  text-red-600
  dark:text-red-400

  hover:bg-red-100
  dark:hover:bg-red-900/50

  transition-all
  duration-200
  "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
