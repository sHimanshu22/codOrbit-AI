const PlatformProfile =
  require("../models/PlatformProfile");

const getOverview =
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
            "No platform data found",
        });
      }

      const overview = {

        githubRepos:
          profile.github
            ?.publicRepos || 0,

        githubStars:
          profile.github
            ?.totalStars || 0,

        leetcodeSolved:
          profile.leetcode
            ?.totalSolved || 0,

        codeforcesRating:
          profile.codeforces
            ?.currentRating || 0,

        platformsConnected:
          [
            profile.github,
            profile.leetcode,
            profile.codeforces,
          ].filter(Boolean)
            .length,
      };

      res.status(200).json({
        success: true,
        overview,
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
  getOverview,
};