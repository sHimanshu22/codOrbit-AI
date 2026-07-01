const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");
const { rebuildPlatformData } = require("../services/platformSyncService");

const syncCodeChefProfile = async (req, res) => {
  try {
    const codechefData =
      await syncCodeChefData(
        req.user._id
      );

    res.status(200).json({
      success: true,
      codechef: codechefData,
    });
  } catch (error) {
    let profile =
      await PlatformProfile.findOne({
        userId: req.user._id,
      });

    if (profile) {
      profile.codechef = null;

      await profile.save();
    }

    return res.status(404).json({
      success: false,
      message:
        "CodeChef profile not found",
    });
  }
};

const getCodeChefAnalytics = async (
  req,
  res
) => {
  try {
    const profile =
      await PlatformProfile.findOne({
        userId: req.user._id,
      });

    if (
      !profile ||
      !profile.codechef
    ) {
      return res.status(404).json({
        success: false,
        message:
          "CodeChef profile not synced",
      });
    }

    res.status(200).json({
      success: true,
      codechef: profile.codechef,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const syncCodeChefData = async (userId) => {
  const profile = await rebuildPlatformData(userId);
  return profile.codechef;
};

module.exports = {
  syncCodeChefProfile,
  getCodeChefAnalytics,
  syncCodeChefData,
};