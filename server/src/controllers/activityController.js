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

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let codingWeek = 0;
    let githubWeek = 0;

    const codingDays = {};
    const githubDays = {};

    codingDocs.forEach((doc) => {
      const date = new Date(doc.date);

      if (date >= sevenDaysAgo) {
        codingWeek += doc.totalActivities;
      }

      const day = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      codingDays[day] = (codingDays[day] || 0) + doc.totalActivities;
    });

    githubDocs.forEach((doc) => {
      const date = new Date(doc.date);

      if (date >= sevenDaysAgo) {
        githubWeek += doc.totalActivities;
      }

      const day = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      githubDays[day] = (githubDays[day] || 0) + doc.totalActivities;
    });

    const mostActiveCodingDay = Object.keys(codingDays).reduce(
      (a, b) => (codingDays[a] > codingDays[b] ? a : b),
      "N/A",
    );

    const mostActiveGithubDay = Object.keys(githubDays).reduce(
      (a, b) => (githubDays[a] > githubDays[b] ? a : b),
      "N/A",
    );

    const consistency =
      codingWeek + githubWeek > 10 ? "Improving" : "Needs Attention";

    res.status(200).json({
      success: true,

      insights: {
        codingWeek,

        githubWeek,

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

module.exports = {
  getStreaks,
  getHeatmap,
  getInsights,
};
