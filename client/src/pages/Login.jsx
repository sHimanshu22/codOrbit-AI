import { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";

import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import { googleLogin } from "../services/googleAuthService";

import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";

const Login = () => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (credentialResponse) => {
    const toastId = toast.loading("Signing you in...");

    try {
      setLoading(true);

      const res = await googleLogin(credentialResponse.credential);

      await login(res.token);

      toast.success("Welcome to CodOrbit!", {
        id: toastId,
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Google Login Failed",
        {
          id: toastId,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen

      bg-gradient-to-br
      from-slate-50
      via-white
      to-blue-50

      dark:from-slate-950
      dark:via-slate-950
      dark:to-slate-900

      flex
      items-center
      justify-center

      px-4
      relative
      "
    >
      <div
        className="
        w-full
        max-w-md

        bg-white/90
        dark:bg-slate-900/90

        backdrop-blur-xl

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl

        shadow-xl
        dark:shadow-2xl

        p-10
        "
      >
        {/* Header */}

        <div className="text-center">
          <div className="flex justify-center">
            <div
              className="
              w-24
              h-24

              rounded-3xl

              bg-gradient-to-br
              from-blue-50
              to-slate-100

              dark:from-slate-800
              dark:to-slate-900

              border
              border-slate-200
              dark:border-slate-700

              flex
              items-center
              justify-center
              "
            >
              <img
                src={lightLogo}
                alt="CodOrbit"
                className="w-20 h-20 dark:hidden"
              />

              <img
                src={darkLogo}
                alt="CodOrbit"
                className="hidden dark:block w-20 h-20"
              />
            </div>
          </div>

          <h1
            className="
            mt-6

            text-3xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            Welcome to CodOrbit
          </h1>

          <p
            className="
            mt-3

            leading-7

            text-slate-500
            dark:text-slate-400
            "
          >
            Build your developer profile with one click using your Google
            account.
          </p>
        </div>

        {/* Google Login */}

        <div
          className={`mt-10 flex justify-center ${
            loading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google Login Failed")}
            useOneTap={true}
            theme={theme === "dark" ? "filled_black" : "outline"}
            size="large"
            shape="pill"
            text="continue_with"
            width="320"
          />
        </div>

        {/* Why CodOrbit */}

        <div
          className="
          mt-8

          rounded-2xl

          bg-blue-50
          dark:bg-blue-950/20

          border
          border-blue-200
          dark:border-blue-900

          p-5
          "
        >
          <div className="flex items-center justify-center gap-3">
            <Sparkles
              className="text-blue-600"
              size={20}
            />

            <h3 className="font-semibold text-slate-900 dark:text-white">
              Why CodOrbit?
            </h3>
          </div>

          <ul className="mt-4 space-y-3">
            <li className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              ✓ Track coding progress across platforms
            </li>

            <li className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              ✓ AI-powered resume & career analysis
            </li>

            <li className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              ✓ Placement-focused DSA roadmap
            </li>

            <li className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <ShieldCheck
                size={16}
                className="text-green-500"
              />
              Secure Google Authentication
            </li>
          </ul>
        </div>

        <p
          className="
          mt-8

          text-center

          text-sm

          leading-6

          text-slate-500
          dark:text-slate-400
          "
        >
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* Loading Overlay */}

      {loading && (
        <div
          className="
          fixed
          inset-0
          z-50

          bg-white/80
          dark:bg-slate-950/80

          backdrop-blur-sm

          flex
          flex-col
          items-center
          justify-center
          "
        >
          <div
            className="
            bg-white
            dark:bg-slate-900

            rounded-3xl

            shadow-xl

            border
            border-slate-200
            dark:border-slate-800

            px-10
            py-8

            flex
            flex-col
            items-center
            "
          >
            <Loader2
              size={42}
              className="animate-spin text-blue-600"
            />

            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
              Signing you in...
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-center">
              Setting up your developer workspace.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;