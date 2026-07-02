const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const githubRoutes = require("./routes/githubRoutes");
const leetcodeRoutes = require("./routes/leetcodeRoutes");
const codeforcesRoutes = require("./routes/codeforcesRoutes");
const platformRoutes = require("./routes/platformRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const dsaRoutes = require("./routes/dsaRoutes");
const activityRoutes = require("./routes/activityRoutes");
const contestRoutes = require("./routes/contestRoutes");
const aiRoutes = require("./routes/aiRoutes");
const codechefRoutes = require("./routes/codechefRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodOrbit API Running",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/codeforces", codeforcesRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api/codechef", codechefRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/google", googleAuthRoutes);



module.exports = app;
