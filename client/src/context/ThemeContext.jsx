import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

export const ThemeProvider = ({
  children,
}) => {
  const [theme, setTheme] =
    useState(
      localStorage.getItem(
        "theme"
      ) || "light"
    );

  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/* Custom Hook */

export const useTheme = () => {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within ThemeProvider"
    );
  }

  return context;
};