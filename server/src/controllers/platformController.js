const {
  syncGitHubData,
} = require("./githubController");

const {
  syncLeetCodeData,
} = require("./leetcodeController");

const {
  syncCodeforcesData,
} = require("./codeforcesController");

const syncAllPlatforms =
  async (req, res) => {
    try {

      const userId =
        req.user._id;

      const results = {};

      try {
        results.github =
          await syncGitHubData(
            userId
          );
      } catch (err) {
        results.github =
          err.message;
      }

      try {
        results.leetcode =
          await syncLeetCodeData(
            userId
          );
      } catch (err) {
        results.leetcode =
          err.message;
      }

      try {
        results.codeforces =
          await syncCodeforcesData(
            userId
          );
      } catch (err) {
        results.codeforces =
          err.message;
      }

      res.status(200).json({
        success: true,
        results,
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
  syncAllPlatforms,
};