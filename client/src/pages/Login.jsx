import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import { AuthContext } from "../context/AuthContext";

import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";

const Login = () => {
  const navigate = useNavigate();

  const { loadUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      await loadUser();

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      dark:bg-slate-950

      flex
      items-center
      justify-center

      px-4

      transition-colors
      "
    >
      <div
        className="
        w-full
        max-w-md

        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl

        shadow-lg
        dark:shadow-none

        p-8
        "
      >
        {/* Header */}

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="flex justify-center mb-5">
            <div
              className="
      w-24
      h-24

      rounded-3xl

      bg-slate-50
      dark:bg-slate-800

      border
      border-slate-200
      dark:border-slate-700

      shadow-sm

      flex
      items-center
      justify-center
      "
            >
              {/* Light Logo */}
              <img
                src={lightLogo}
                alt="CodOrbit"
                className="
        w-20
        h-20

        dark:hidden
        "
              />

              {/* Dark Logo */}
              <img
                src={darkLogo}
                alt="CodOrbit"
                className="
        hidden
        dark:block

        w-20
        h-20
        "
              />
            </div>
          </div>

          <h1
            className="
    text-3xl
    font-bold

    text-slate-900
    dark:text-white
    "
          >
            CodOrbit AI
          </h1>

          <p
            className="
    mt-2

    text-slate-500
    dark:text-slate-400
    "
          >
            AI-Powered Developer Growth Platform
          </p>
        </div>
        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="
              block
              text-sm
              font-medium

              text-slate-600
              dark:text-slate-300

              mb-2
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="
              w-full

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              border
              border-slate-200
              dark:border-slate-700

              rounded-xl

              px-4
              py-3

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium

              text-slate-600
              dark:text-slate-300

              mb-2
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="
              w-full

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              border
              border-slate-200
              dark:border-slate-700

              rounded-xl

              px-4
              py-3

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />
          </div>

          <button
            type="submit"
            className="
            w-full

            bg-blue-600
            hover:bg-blue-700

            text-white

            py-3

            rounded-xl

            font-medium

            transition-all
            duration-200
            "
          >
            Sign In
          </button>
        </form>

        {/* Footer */}

        <div className="mt-6 text-center">
          <p
            className="
            text-slate-500
            dark:text-slate-400
            "
          >
            Don't have an account?
            <Link
              to="/register"
              className="
              text-blue-600
              dark:text-blue-400

              font-medium

              ml-1
              "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
