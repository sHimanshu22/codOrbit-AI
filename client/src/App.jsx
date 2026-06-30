import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
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

import ResumeAnalysis from "./pages/ResumeAnalysis";
import SavedQuestionsPage from "./pages/SavedQuestionsPage";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/u/:username" element={<PublicProfile />} />

        {/* Protected */}

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
              <SavedQuestionsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
