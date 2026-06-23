const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");

const {
  fetchCodeChefProfile,
} = require("../services/codechefService");

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

const syncCodeChefData = async (
  userId
) => {
  const user =
    await User.findById(userId);

  if (
    !user.codechefUsername
  ) {
    throw new Error(
      "CodeChef username not found"
    );
  }

  let profile =
    await PlatformProfile.findOne({
      userId,
    });

  if (!profile) {
    profile =
      new PlatformProfile({
        userId,
      });
  }

  try {
    const codechefData =
      await fetchCodeChefProfile(
        user.codechefUsername
      );

    profile.codechef = {
      username:
        codechefData.username,

      currentRating:
        codechefData.currentRating,

      highestRating:
        codechefData.highestRating,

      stars:
        codechefData.stars,

      globalRank:
        codechefData.globalRank,

      countryRank:
        codechefData.countryRank,

      syncStatus: "success",

      lastError: null,

      syncedAt: new Date(),
    };

    await profile.save();

    return profile.codechef;
  } catch (error) {
    profile.codechef = {
      syncStatus: "failed",

      syncedAt: new Date(),

      lastError:
        error.message,
    };

    await profile.save();

    throw error;
  }
};

module.exports = {
  syncCodeChefProfile,
  getCodeChefAnalytics,
  syncCodeChefData,
};