import { useContext } from "react";

import { Moon, Sun } from "lucide-react";

import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="
      flex
      items-center
      justify-center
      w-13
      h-13
      rounded-xl
      border
      border-slate-200
      dark:border-slate-700
      bg-white
      dark:bg-slate-900
      text-slate-700
      dark:text-slate-200
      hover:bg-slate-100
      dark:hover:bg-slate-800
      transition-all
      "
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
