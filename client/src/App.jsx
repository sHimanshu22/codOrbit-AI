import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import DSATracker from "./pages/DSATracker";
import DSAOverview from "./pages/DSAOverview";
import SheetManagement from "./pages/SheetManagement";
import Contests from "./pages/Contests";

import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./pages/Landing";
import PublicProfile from "./pages/PublicProfile";

import ForgotPassword from "./pages/ForgotPassword";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import SavedQuestionsPage from "./pages/SavedQuestionsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dsa-tracker"
          element={
            <ProtectedRoute>
              <DSATracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sheet-management"
          element={
            <ProtectedRoute>
              <SheetManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dsa-overview"
          element={
            <ProtectedRoute>
              <DSAOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contests"
          element={
            <ProtectedRoute>
              <Contests />
            </ProtectedRoute>
          }
        />

        <Route path="/u/:username" element={<PublicProfile />} />

        <Route
          path="/resume-analysis"
          element={
            <ProtectedRoute>
              <ResumeAnalysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-questions"
          element={
            <ProtectedRoute>
              <SavedQuestionsPage  />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
