import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import api from "../services/api";
import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

    const toastId = toast.loading("Creating your account...");

    try {
      setLoading(true);

      const res = await api.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Account created successfully!", { id: toastId });

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed", { id: toastId });
    } finally {
      setLoading(false);
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

        p-8
        "
      >
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

      flex
      items-center
      justify-center

      shadow-sm
      "
            >
              {/* Light Logo */}
              <img
                src={lightLogo}
                alt="CodOrbit"
                className="
        w-16
        h-16

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

        w-16
        h-16
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
            CodOrbit
          </h1>

          <p
            className="
    text-slate-500
    dark:text-slate-400

    mt-2
    "
          >
            Start your developer growth journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}

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

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              placeholder:text-slate-400
              dark:placeholder:text-slate-500

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

          {/* Email */}

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

              placeholder:text-slate-400
              dark:placeholder:text-slate-500

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

          {/* Password */}

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
              placeholder="Create a password"
              className="
              w-full

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              placeholder:text-slate-400
              dark:placeholder:text-slate-500

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
            disabled={loading}
            className="
  w-full

  bg-blue-600
  hover:bg-blue-700

  disabled:bg-blue-400
  disabled:cursor-not-allowed

  text-white

  py-3

  rounded-xl

  font-medium

  transition-all
  duration-200

  flex
  items-center
  justify-center
  gap-2
  "
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p
            className="
            text-slate-500
            dark:text-slate-400
            "
          >
            Already have an account?
            <Link
              to="/login"
              className="
              text-blue-600
              dark:text-blue-400

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
