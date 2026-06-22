const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  getUserProfile,
  getUserProfileByUsername,
  updateUserProfile,
  updateActiveSheets,
  uploadProfileImage,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.get("/u/:username", protect, getUserProfileByUsername);

router.put("/profile", protect, updateUserProfile);

router.put("/active-sheets", protect, updateActiveSheets);

router.post(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage,
);

module.exports = router;
