const express = require("express");
const bcrypt = require("bcryptjs");

const { sendResetOtpEmail } = require("../services/emailService");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOtp);

router.post("/reset-password", resetPassword);

module.exports = router;
