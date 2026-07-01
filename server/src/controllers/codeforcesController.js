const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");
const { rebuildPlatformData } = require("../services/platformSyncService");

/**
 * Sync Codeforces Profile API
 */
const syncCodeforcesProfile = async (req, res) => {
  try {
    const codeforcesData =
      await syncCodeforcesData(
        req.user._id
      );

    res.status(200).json({
      success: true,
      codeforces: codeforcesData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Codeforces Analytics API
 */
const getCodeforcesAnalytics =
  async (req, res) => {
    try {
      const profile =
        await PlatformProfile.findOne({
          userId: req.user._id,
        });

      if (
        !profile ||
        !profile.codeforces
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Codeforces profile not synced",
        });
      }

      res.status(200).json({
        success: true,
        codeforces:
          profile.codeforces,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/**
 * Core Sync Logic
 */
const syncCodeforcesData = async (userId) => {
  const profile = await rebuildPlatformData(userId);
  return profile.codeforces;
};

  


module.exports = {
  syncCodeforcesProfile,
  getCodeforcesAnalytics,
  syncCodeforcesData,
};