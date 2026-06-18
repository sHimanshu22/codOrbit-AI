import {
  useState,
  useContext,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import {
  AuthContext,
} from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { loadUser } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await api.post(
            "/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        await loadUser();

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      flex
      items-center
      justify-center
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        border
        border-slate-200
        rounded-3xl
        shadow-lg
        p-8
        "
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            CodOrbit AI
          </h1>

          <p className="text-slate-500 mt-2">
            AI-Powered Developer Growth Platform
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-600
              mb-2
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              placeholder="Enter your email"
              className="
              w-full
              border
              border-slate-200
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
              mb-2
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter your password"
              className="
              w-full
              border
              border-slate-200
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
            "
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500">
            Don't have an account?

            <Link
              to="/register"
              className="
              text-blue-600
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