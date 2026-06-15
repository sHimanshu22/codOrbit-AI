import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">CodOrbit AI</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/analytics">Analytics</Link>

        <Link to="/dsa-tracker">DSA Tracker</Link>

        <Link to="/contests">Contests</Link>

        <Link to="/settings">Settings</Link>

        <Link to="/dsa-overview">DSA Overview</Link>

        <Link to="/sheet-management">DSA Sheets</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
