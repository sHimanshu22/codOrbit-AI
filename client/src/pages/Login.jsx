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

  const navigate =
    useNavigate();

  const { loadUser } =
    useContext(
      AuthContext
    );

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e
  ) => {

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
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 shadow rounded"
      >

        <h2 className="text-2xl font-bold mb-4">

          Login

        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full py-2"
        >
          Login
        </button>

        <p className="mt-3">

          Don't have account?

          <Link
            to="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;