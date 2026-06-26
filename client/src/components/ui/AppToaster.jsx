import { Toaster } from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

export const AppToaster = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        duration: 3000,

        style: {
          borderRadius: "14px",
          background: isDark ? "#0f172a" : "#ffffff",
          color: isDark ? "#f8fafc" : "#0f172a",
          border: isDark
            ? "1px solid #1e293b"
            : "1px solid #e2e8f0",
          boxShadow: isDark
            ? "0 10px 25px rgba(0,0,0,0.35)"
            : "0 10px 25px rgba(15,23,42,0.08)",
          fontSize: "14px",
          fontWeight: 500,
          padding: "14px 16px",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },

        loading: {
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};