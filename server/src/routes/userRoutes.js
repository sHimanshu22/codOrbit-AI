const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getUserProfile,
  getUserProfileByUsername,
  updateUserProfile,
  updateActiveSheets,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.get("/u/:username", protect, getUserProfileByUsername);

router.put("/profile", protect, updateUserProfile);

router.put("/active-sheets", protect, updateActiveSheets);

module.exports = router;
