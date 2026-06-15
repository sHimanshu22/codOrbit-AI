const PlatformProfile =
  require("../models/PlatformProfile");

const getAnalytics =
  async (req, res) => {
    try {

      const profile =
        await PlatformProfile.findOne({
          userId: req.user._id,
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message:
            "Analytics data not found",
        });
      }

      const analytics = {

        github: {
          languages:
            profile.github
              ?.languagesUsed || [],

          totalRepos:
            profile.github
              ?.publicRepos || 0,

          totalStars:
            profile.github
              ?.totalStars || 0,
        },

        leetcode: {
          easy:
            profile.leetcode
              ?.easySolved || 0,

          medium:
            profile.leetcode
              ?.mediumSolved || 0,

          hard:
            profile.leetcode
              ?.hardSolved || 0,

          total:
            profile.leetcode
              ?.totalSolved || 0,
        },

        codeforces: {
          rating:
            profile.codeforces
              ?.currentRating || 0,

          contests:
            profile.codeforces
              ?.contestCount || 0,
        },
      };

      res.status(200).json({
        success: true,
        analytics,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

module.exports = {
  getAnalytics,
};