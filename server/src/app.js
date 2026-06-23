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

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CodOrbit AI Backend Running");
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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

module.exports = app;
