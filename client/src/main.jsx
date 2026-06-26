import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "@fontsource/inter";

import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AppToaster } from "./components/ui/AppToaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ThemeProvider>
    <AuthProvider>
      <App />

      <AppToaster/>
    </AuthProvider>
  </ThemeProvider>
</React.StrictMode>
);
