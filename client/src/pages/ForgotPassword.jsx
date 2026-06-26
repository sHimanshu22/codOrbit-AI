import { useState } from "react";
import { toast } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";

import {
  Loader2,
  ArrowLeft,
} from "lucide-react";

import {
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "../services/authService";

import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSendOtp =
    async () => {
      const toastId = toast.loading(
        "Sending OTP..."
      );

      try {
        setLoading(true);

        await forgotPassword(email);

        toast.success(
          "OTP sent successfully",
          { id: toastId }
        );

        setStep(2);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to send OTP",
          { id: toastId }
        );
      } finally {
        setLoading(false);
      }
    };

  const handleVerifyOtp =
    async () => {
      const toastId = toast.loading(
        "Verifying OTP..."
      );

      try {
        setLoading(true);

        await verifyResetOtp(
          email,
          otp
        );

        toast.success(
          "OTP verified successfully",
          { id: toastId }
        );

        setStep(3);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Invalid OTP",
          { id: toastId }
        );
      } finally {
        setLoading(false);
      }
    };

  const handleResetPassword =
    async () => {
      if (
        password !==
        confirmPassword
      ) {
        return toast.error(
          "Passwords do not match"
        );
      }

      const toastId = toast.loading(
        "Resetting password..."
      );

      try {
        setLoading(true);

        await resetPassword(
          email,
          otp,
          password
        );

        toast.success(
          "Password reset successful",
          { id: toastId }
        );

        navigate("/login");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Reset failed",
          { id: toastId }
        );
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

        shadow-xl
        dark:shadow-none

        p-8
        "
      >
        {/* Header */}

        <div className="text-center mb-8">
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
              <img
                src={lightLogo}
                alt="CodOrbit"
                className="
                w-20
                h-20
                dark:hidden
                "
              />

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
            Forgot Password
          </h1>

          <p
            className="
            mt-2

            text-slate-500
            dark:text-slate-400
            "
          >
            Recover your account
          </p>

          {/* Step Indicator */}

          <div className="flex items-center justify-center gap-3 mt-6">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className={`
                  w-10
                  h-10

                  rounded-full

                  flex
                  items-center
                  justify-center

                  text-sm
                  font-semibold

                  ${
                    step >= item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  }
                  `}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* Step 1 */}

        {step === 1 && (
          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
              w-full

              px-4
              py-3

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              placeholder:text-slate-400
              dark:placeholder:text-slate-500

              border
              border-slate-200
              dark:border-slate-700

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500

              transition-all
              "
            />

            <button
              onClick={
                handleSendOtp
              }
              disabled={loading}
              className="
              w-full

              flex
              items-center
              justify-center
              gap-2

              bg-blue-600
              hover:bg-blue-700

              disabled:opacity-70
              disabled:cursor-not-allowed

              text-white

              py-3.5

              rounded-xl

              font-medium

              transition-all
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        )}

        {/* Step 2 */}

        {step === 2 && (
          <div className="space-y-5">
            <input
              value={email}
              readOnly
              className="
              w-full

              px-4
              py-3

              rounded-xl

              bg-slate-100
              dark:bg-slate-800

              text-slate-600
              dark:text-slate-300

              border
              border-slate-200
              dark:border-slate-700
              "
            />

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              className="
              w-full

              px-4
              py-3

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              border
              border-slate-200
              dark:border-slate-700

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <button
              onClick={
                handleVerifyOtp
              }
              disabled={loading}
              className="
              w-full

              flex
              items-center
              justify-center
              gap-2

              bg-blue-600
              hover:bg-blue-700

              disabled:opacity-70
              disabled:cursor-not-allowed

              text-white

              py-3.5

              rounded-xl

              font-medium

              transition-all
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Verifying OTP...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {/* Step 3 */}

        {step === 3 && (
          <div className="space-y-5">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
              w-full

              px-4
              py-3

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              border
              border-slate-200
              dark:border-slate-700

              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              "
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="
              w-full

              px-4
              py-3

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-900
              dark:text-white

              border
              border-slate-200
              dark:border-slate-700

              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              "
            />

            <button
              onClick={
                handleResetPassword
              }
              disabled={loading}
              className="
              w-full

              flex
              items-center
              justify-center
              gap-2

              bg-green-600
              hover:bg-green-700

              disabled:opacity-70
              disabled:cursor-not-allowed

              text-white

              py-3.5

              rounded-xl

              font-medium

              transition-all
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        )}

        {/* Footer */}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="
            inline-flex
            items-center
            gap-2

            text-sm

            text-slate-500
            dark:text-slate-400

            hover:text-blue-600
            dark:hover:text-blue-400

            transition-colors
            "
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;