const PlatformProfile = require("../models/PlatformProfile");

const DSAProgress = require("../models/DSAProgress");

const CodingActivity = require("../models/CodingActivity");

const GitHubActivity = require("../models/GitHubActivity");

const { generateAIResponse } = require("../services/geminiService");

const ActivitySnapshot = require("../models/ActivitySnapshot");

const { getUserStreaks } = require("../services/streakService");

const getDeveloperScore = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    const dsa = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const coding = await CodingActivity.find({
      userId: req.user._id,
    });

    const github = await GitHubActivity.find({
      userId: req.user._id,
    });

    let score = 0;

    // DSA

    const solvedCount = dsa ? dsa.questions.filter((q) => q.solved).length : 0;

    score += Math.min(25, solvedCount / 4);

    // LeetCode

    score += Math.min(20, (profile?.leetcode?.totalSolved || 0) / 5);

    // GitHub Repos

    score += Math.min(10, (profile?.github?.publicRepos || 0) / 2);

    // GitHub Activity

    const githubActivity = github.reduce(
      (sum, item) => sum + item.totalActivities,
      0,
    );

    score += Math.min(15, githubActivity);

    // Codeforces

    score += Math.min(15, (profile?.codeforces?.currentRating || 0) / 100);

    // Coding Streak

    score += Math.min(10, coding.length);

    // Development Streak

    score += Math.min(5, github.length);

    score = Math.round(score);

    let level = "Beginner";

    if (score >= 40) level = "Growing Developer";

    if (score >= 70) level = "Placement Ready";

    if (score >= 90) level = "Elite Developer";

    res.status(200).json({
      success: true,

      developerScore: score,

      level,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const testAI = async (req, res) => {
  try {
    const response = await generateAIResponse("Say hello from CodOrbit AI");
   
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAIInsights = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    const snapshot = await ActivitySnapshot.findOne({
      userId: req.user._id,
    });

    const streaks = await getUserStreaks(req.user._id);

    const prompt = `
You are CodOrbit AI.

Analyze this developer profile.

LeetCode Solved:
${profile?.leetcode?.totalSolved || 0}

GitHub Repositories:
${profile?.github?.publicRepos || 0}

GitHub Stars:
${profile?.github?.totalStars || 0}

Codeforces Contests:
${profile?.codeforces?.contestCount || 0}

Coding Streak:
${streaks.coding.current}

GitHub Streak:
${streaks.github.current}

Provide:

1. Strengths
2. Weaknesses
3. Focus Areas
4. Placement Advice

Keep response under 200 words.
`;

    const insights = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getDeveloperScore,
  testAI,
  getAIInsights,
};
