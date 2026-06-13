const express = require("express");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  syncAllPlatforms,
} = require("../controllers/platformController");

const router = express.Router();

router.post(
  "/sync-all",
  protect,
  syncAllPlatforms
);

module.exports = router;