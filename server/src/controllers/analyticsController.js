const PlatformProfile = require("../models/PlatformProfile");

const {
  calculateDeveloperScore,
} = require("../services/developerScoreService");

const getAnalytics = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (!profile) {
      return res.status(200).json({
        success: true,
        analytics: {
          scores: {
            githubScore: 0,
            dsaScore: 0,
            competitiveScore: 0,
            overallScore: 0,
          },

          github: null,
          leetcode: null,
          codeforces: null,
          codechef: null,
        },
      });
    }
    // =========================
    // Developer Score
    // =========================

    const scores = await calculateDeveloperScore(profile, req.user._id);

    // =========================
    // Analytics Object
    // =========================

    const analytics = {
      scores,

      github: {
        languages: profile.github?.languagesUsed || [],

        totalRepos: profile.github?.publicRepos || 0,

        totalStars: profile.github?.totalStars || 0,
      },

      leetcode: {
        easy: profile.leetcode?.easySolved || 0,

        medium: profile.leetcode?.mediumSolved || 0,

        hard: profile.leetcode?.hardSolved || 0,

        total: profile.leetcode?.totalSolved || 0,
      },

      codeforces: {
        rating: profile.codeforces?.currentRating || 0,

        contests: profile.codeforces?.contestCount || 0,
      },

      codechef: {
        currentRating: profile.codechef?.currentRating || 0,

        highestRating: profile.codechef?.highestRating || 0,

        stars: profile.codechef?.stars || "",

        globalRank: profile.codechef?.globalRank || 0,

        countryRank: profile.codechef?.countryRank || 0,
      },

      connectedPlatforms: {
        github: profile.github?.syncStatus === "success",
        leetcode: profile.leetcode?.syncStatus === "success",
        codeforces: profile.codeforces?.syncStatus === "success",
        codechef: profile.codechef?.syncStatus === "success",
      },
    };

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};
