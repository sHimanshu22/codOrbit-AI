import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b flex justify-between items-center px-6">
      <div>
        <h2 className="font-semibold">Welcome to CodOrbit AI</h2>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
