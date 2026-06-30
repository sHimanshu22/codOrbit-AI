const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { getMe } = require("../controllers/authController");

const router = express.Router();

router.get("/me", protect, getMe);

module.exports = router;