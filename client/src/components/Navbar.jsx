import {
  Search,
  Bell,
  LogOut,
  User,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const Navbar = () => {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (

    <header
      className="
      h-20
      bg-white
      border-b
      border-slate-200
      px-8
      flex
      items-center
      justify-between
      "
    >

      {/* Left Side */}

      <div>

        <p className="text-sm text-slate-500">

          Welcome back

        </p>

        <h2 className="font-semibold text-slate-900">

          Today is a great day to build

        </h2>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <button
          className="
          h-10
          w-10
          rounded-xl
          bg-slate-100
          flex
          items-center
          justify-center
          "
        >

          <Bell
            size={18}
          />

        </button>

        <div
          className="
          flex
          items-center
          gap-3
          px-4
          py-2
          rounded-xl
          bg-slate-100
          "
        >

          <User
            size={18}
          />

          <span>

            Developer

          </span>

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
          text-red-600
          hover:bg-red-100
          transition
          "
        >

          <LogOut
            size={18}
          />

          Logout

        </button>

      </div>

    </header>

  );
};

export default Navbar;