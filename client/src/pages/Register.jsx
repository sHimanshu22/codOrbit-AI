import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

const Register = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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
            "/auth/register",
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
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
            Start your developer growth journey
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
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
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
            Create Account
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-slate-500">

            Already have an account?

            <Link
              to="/"
              className="
              text-blue-600
              font-medium
              ml-1
              "
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
};

export default Register;