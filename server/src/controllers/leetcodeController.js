const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");
const { rebuildPlatformData } = require("../services/platformSyncService");

// Sync LeetCode Data
const syncLeetCodeProfile = async (req, res) => {
  try {
    const leetcodeData = await syncLeetCodeData(req.user._id);

    res.status(200).json({
      success: true,
      leetcode: leetcodeData,
    });
  } catch (error) {
    let profile = await PlatformProfile.findOne({
      userId: user._id,
    });

    if (profile) {
      profile.leetcode = null;

      await profile.save();
    }

    return res.status(404).json({
      success: false,
      message: "LeetCode profile not found",
    });
  }
};

// Get LeetCode Analytics
const getLeetCodeAnalytics = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (!profile || !profile.leetcode) {
      return res.status(404).json({
        success: false,
        message: "LeetCode profile not synced",
      });
    }

    res.status(200).json({
      success: true,
      leetcode: profile.leetcode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const syncLeetCodeData = async (userId) => {
  const profile = await rebuildPlatformData(userId);
  return profile.leetcode;
};

module.exports = {
  syncLeetCodeProfile,
  getLeetCodeAnalytics,
  syncLeetCodeData,
};
