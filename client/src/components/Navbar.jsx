import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ui/ThemeToggle";
import { getProfile } from "../services/userService";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const firstName = user?.name?.trim()?.split(" ")[0] || "Developer";

  return (
    <header
      className="
      h-18

      bg-white
      dark:bg-slate-900

      border-b
      border-slate-200
      dark:border-slate-800

      px-8

      flex
      items-center
      justify-between

        sticky
  top-0
  z-50
      
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
          Orbit your way to coding excellence.
        </h2>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <button
          onClick={() => {
            if (user?.username) {
              navigate("/profile");
            }
          }}
          className="
          flex
          items-center
          gap-3

          px-3
          py-2

          rounded-xl

          bg-slate-100
          dark:bg-slate-800

          hover:bg-slate-200
          dark:hover:bg-slate-700

          transition-all
          duration-200
          "
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="
              w-9
              h-9

              rounded-full
              object-cover
              "
            />
          ) : (
            <div
              className="
              w-9
              h-9

              rounded-full

              bg-blue-600

              flex
              items-center
              justify-center

              text-white
              font-semibold
              text-sm
              "
            >
              {firstName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="hidden md:block text-left">
            <p
              className="
              text-base
              lg:text-lg

              font-medium

              text-slate-900
              dark:text-slate-100

              leading-none
              "
            >
              {firstName}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
