const PlatformProfile = require("../models/PlatformProfile");

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
    // Score Calculations
    // =========================

    const githubScore = Math.min(
      (profile.github?.publicRepos || 0) * 3 +
        (profile.github?.totalStars || 0) * 2,
      100,
    );

    const dsaScore = Math.min((profile.leetcode?.totalSolved || 0) / 2, 100);

    const competitiveScore = Math.min(
      (profile.codeforces?.currentRating || 0) / 20,
      100,
    );

    const overallScore = Math.round(
      (githubScore + dsaScore + competitiveScore) / 3,
    );

    // =========================
    // Analytics Object
    // =========================

    const analytics = {
      scores: {
        githubScore,
        dsaScore,
        competitiveScore,
        overallScore,
      },

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
