const PlatformProfile = require("../models/PlatformProfile");
const {
  calculateDeveloperScore,
} = require("../services/developerScoreService");

const getOverview = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    const developerScore = await calculateDeveloperScore(profile, req.user._id);
  

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "No platform data found",
      });
    }

    const overview = {
      githubRepos:
        profile.github?.syncStatus === "success"
          ? profile.github.publicRepos
          : 0,

      githubStars:
        profile.github?.syncStatus === "success"
          ? profile.github.totalStars
          : 0,

      leetcodeSolved: profile.leetcode?.totalSolved || 0,

      codeforcesRating:
        profile.codeforces?.syncStatus === "success"
          ? profile.codeforces.currentRating
          : 0,

      codechefRating:
        profile.codechef?.syncStatus === "success"
          ? profile.codechef.currentRating
          : 0,

      platformsConnected: [
        profile.github?.syncStatus === "success",
        profile.leetcode?.syncStatus === "success",
        profile.codeforces?.syncStatus === "success",
        profile.codechef?.syncStatus === "success",
      ].filter(Boolean).length,
    };

    res.status(200).json({
      success: true,
      overview,
      developerScore
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOverview,
};
