const { rebuildPlatformData } = require("../services/platformSyncService");

const syncAllPlatforms = async (req, res) => {
  try {
    const userId = req.user._id;

    const results = {};

    try {
      const rebuiltProfile = await rebuildPlatformData(userId);

      results.profile = rebuiltProfile;
      results.github = rebuiltProfile.github;
      results.leetcode = rebuiltProfile.leetcode;
      results.codeforces = rebuiltProfile.codeforces;
      results.codechef = rebuiltProfile.codechef;
      results.activity = {
        rebuilt: true,
        snapshotUpdated: true,
      };
    } catch (err) {
      results.error = err.message;
    }

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  syncAllPlatforms,
};
