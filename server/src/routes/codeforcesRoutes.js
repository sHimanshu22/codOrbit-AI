const express = require("express");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  syncCodeforcesProfile,
  getCodeforcesAnalytics,
} = require("../controllers/codeforcesController");

const router = express.Router();

router.post(
  "/sync",
  protect,
  syncCodeforcesProfile
);

router.get(
  "/analytics",
  protect,
  getCodeforcesAnalytics
);

module.exports = router;