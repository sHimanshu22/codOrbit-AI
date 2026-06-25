const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadResume");

const { analyzeResume } = require("../controllers/resumeController");

const router = express.Router();
router.post(
  "/analyze",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobDescription", maxCount: 1 },
  ]),
  analyzeResume,
);

module.exports = router;
