const express = require("express");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  getUserProfile,
  updateUserProfile,
  updateActiveSheets
} = require("../controllers/userController");

const router = express.Router();

router.get(
  "/profile",
  protect,
  getUserProfile
);

router.put(
  "/profile",
  protect,
  updateUserProfile
);

router.put(
  "/active-sheets",
  protect,
  updateActiveSheets
);

module.exports = router;