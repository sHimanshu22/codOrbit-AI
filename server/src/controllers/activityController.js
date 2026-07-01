const { getUserStreaks } = require("../services/streakService");

const CodingActivity = require("../models/CodingActivity");

const GitHubActivity = require("../models/GitHubActivity");

const getStreaks = async (req, res) => {
  try {
    const streaks = await getUserStreaks(req.user._id);

    res.status(200).json({
      success: true,

      streaks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getHeatmap = async (req, res) => {
  try {
    const codingDocs = await CodingActivity.find({
      userId: req.user._id,
    });

    const githubDocs = await GitHubActivity.find({
      userId: req.user._id,
    });

    const codingMap = new Map();

    const githubMap = new Map();

    codingDocs.forEach((doc) => {
      codingMap.set(doc.date, doc.totalActivities);
    });

    githubDocs.forEach((doc) => {
      githubMap.set(doc.date, doc.totalActivities);
    });

    const coding = [];
    const github = [];

    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date();

      date.setDate(today.getDate() - i);

      const formatted = date.toISOString().split("T")[0];

      coding.push({
        date: formatted,

        count: codingMap.get(formatted) || 0,
      });

      github.push({
        date: formatted,

        count: githubMap.get(formatted) || 0,
      });
    }

    res.status(200).json({
      success: true,

      coding,

      github,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getInsights = async (req, res) => {
  try {
    const codingDocs = await CodingActivity.find({
      userId: req.user._id,
    });

    const githubDocs = await GitHubActivity.find({
      userId: req.user._id,
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    let codingWeek = 0;
    let githubWeek = 0;

    const codingDays = {};
    const githubDays = {};

    const activeDays = new Set();

    // =========================
    // Coding (Last 7 Days)
    // =========================

    codingDocs.forEach((doc) => {
      const date = new Date(doc.date);

      if (date >= sevenDaysAgo) {
        codingWeek += doc.totalActivities;

        if (doc.totalActivities > 0) {
          activeDays.add(doc.date);

          const day = date.toLocaleDateString("en-US", {
            weekday: "long",
          });

          codingDays[day] = (codingDays[day] || 0) + doc.totalActivities;
        }
      }
    });

    // =========================
    // GitHub (Last 7 Days)
    // =========================

    githubDocs.forEach((doc) => {
      const date = new Date(doc.date);

      if (date >= sevenDaysAgo) {
        githubWeek += doc.totalActivities;

        if (doc.totalActivities > 0) {
          activeDays.add(doc.date);

          const day = date.toLocaleDateString("en-US", {
            weekday: "long",
          });

          githubDays[day] = (githubDays[day] || 0) + doc.totalActivities;
        }
      }
    });

    // =========================
    // Best Days
    // =========================

    const mostActiveCodingDay =
      Object.keys(codingDays).length > 0
        ? Object.keys(codingDays).reduce((a, b) =>
            codingDays[a] > codingDays[b] ? a : b,
          )
        : "No Activity";

    const mostActiveGithubDay =
      Object.keys(githubDays).length > 0
        ? Object.keys(githubDays).reduce((a, b) =>
            githubDays[a] > githubDays[b] ? a : b,
          )
        : "No Activity";

    // =========================
    // Consistency
    // =========================

    const activeDayCount = activeDays.size;

    let consistency = "Inactive";

    if (activeDayCount === 7) {
      consistency = "Excellent";
    } else if (activeDayCount >= 5) {
      consistency = "Very Good";
    } else if (activeDayCount >= 3) {
      consistency = "Good";
    } else if (activeDayCount >= 1) {
      consistency = "Needs Improvement";
    }

    res.status(200).json({
      success: true,

      insights: {
        codingWeek,
        githubWeek,

        totalWeekActivity: codingWeek + githubWeek,

        activeDays: activeDayCount,

        mostActiveCodingDay,

        mostActiveGithubDay,

        consistency,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getActivityCoach = async (req, res) => {
  try {
    const fortyFiveDaysAgo = new Date();
    fortyFiveDaysAgo.setDate(fortyFiveDaysAgo.getDate() - 45);

    const coding = await CodingActivity.find({
      userId: req.user._id,
      date: {
        $gte: fortyFiveDaysAgo.toISOString().split("T")[0],
      },
    });

    const github = await GitHubActivity.find({
      userId: req.user._id,
      date: {
        $gte: fortyFiveDaysAgo.toISOString().split("T")[0],
      },
    });

    // =========================
    // Totals
    // =========================

    const coding45Days = coding.reduce(
      (sum, day) => sum + day.totalActivities,
      0,
    );

    const github45Days = github.reduce(
      (sum, day) => sum + day.totalActivities,
      0,
    );

    // =========================
    // Active Days
    // =========================

    const activeDays = new Set();

    coding.forEach((day) => {
      if (day.totalActivities > 0) {
        activeDays.add(day.date);
      }
    });

    github.forEach((day) => {
      if (day.totalActivities > 0) {
        activeDays.add(day.date);
      }
    });

    // =========================
    // Productivity Score (0-100)
    // =========================

    const activityScore = Math.min(
      Math.round(((coding45Days + github45Days) / 200) * 100),
      100,
    );

    // =========================
    // Focus
    // =========================

    let focus = "Balanced";

    if (coding45Days > github45Days * 1.5) {
      focus = "Coding Focused";
    } else if (github45Days > coding45Days * 1.5) {
      focus = "Development Focused";
    }

    // =========================
    // Strength & Improvement
    // =========================

    let strength = "Balanced";

    let needsAttention = "Maintain Consistency";

    if (coding45Days > github45Days) {
      strength = "Problem Solving";
      needsAttention = "Development";
    } else if (github45Days > coding45Days) {
      strength = "Development";
      needsAttention = "Problem Solving";
    }

    if (activeDays.size < 15) {
      needsAttention = "Consistency";
    }


    res.status(200).json({
      success: true,

      coach: {
        coding45Days,
        github45Days,

        activityScore,

        activeDays: activeDays.size,

        focus,

        strength,

        needsAttention,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStreaks,
  getHeatmap,
  getInsights,
  getActivityCoach,
};
