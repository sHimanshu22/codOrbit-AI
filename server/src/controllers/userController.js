const User = require("../models/User");

// GET PROFILE
const getUserProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PROFILE
const updateUserProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.college =
      req.body.college ||
      user.college;

    user.branch =
      req.body.branch ||
      user.branch;

    user.graduationYear =
      req.body.graduationYear ||
      user.graduationYear;

    user.githubUsername =
      req.body.githubUsername ||
      user.githubUsername;

    user.leetcodeUsername =
      req.body.leetcodeUsername ||
      user.leetcodeUsername;

    user.codeforcesUsername =
      req.body.codeforcesUsername ||
      user.codeforcesUsername;

    user.gfgUsername =
      req.body.gfgUsername ||
      user.gfgUsername;

    user.hackerrankUsername =
      req.body.hackerrankUsername ||
      user.hackerrankUsername;

    const updatedUser =
      await user.save();

    res.status(200).json({
      success: true,
      user: updatedUser,
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateActiveSheets =
  async (req, res) => {

    try {

      const {
        activeSheets,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      user.activeSheets =
        activeSheets;

      await user.save();

      res.status(200).json({
        success: true,

        activeSheets:
          user.activeSheets,
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
  getUserProfile,
  updateUserProfile,
  updateActiveSheets,
};