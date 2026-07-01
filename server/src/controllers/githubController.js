const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");
const { rebuildPlatformData } = require("../services/platformSyncService");

const syncGitHubProfile = async (req, res) => {
  try {
    const profile = await rebuildPlatformData(req.user._id);

    res.status(200).json({
      success: true,
      github: profile.github,
    });
  } catch (error) {
    let profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (profile) {
      profile.github = null;

      await profile.save();
    }

    return res.status(404).json({
      success: false,
      message: "GitHub profile not found",
    });
  }
};
const getGitHubAnalytics = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (!profile || !profile.github) {
      return res.status(404).json({
        success: false,
        message: "GitHub profile not synced",
      });
    }

    res.status(200).json({
      success: true,
      github: profile.github,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const syncGitHubData = async (userId) => {
  const profile = await rebuildPlatformData(userId);
  return profile.github;
};

module.exports = {
  syncGitHubProfile,
  getGitHubAnalytics,
  syncGitHubData,
};
