import api from "./api";

export const forgotPassword = async (email) => {
  const res = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return res.data;
};

export const verifyResetOtp = async (
  email,
  otp
) => {
  const res = await api.post(
    "/auth/verify-reset-otp",
    {
      email,
      otp,
    }
  );

  return res.data;
};

export const resetPassword = async (
  email,
  otp,
  password
) => {
  const res = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      password,
    }
  );

  return res.data;
};