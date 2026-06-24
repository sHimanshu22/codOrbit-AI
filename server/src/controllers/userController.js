const User = require("../models/User");
const DSAProgress = require("../models/DSAProgress");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// GET PROFILE
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

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
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.body.name !== undefined) user.name = req.body.name;

    if (req.body.college !== undefined) user.college = req.body.college;

    if (req.body.branch !== undefined) user.branch = req.body.branch;

    if (req.body.graduationYear !== undefined)
      user.graduationYear = req.body.graduationYear;

    if (req.body.githubUsername !== undefined)
      user.githubUsername = req.body.githubUsername;

    if (req.body.leetcodeUsername !== undefined)
      user.leetcodeUsername = req.body.leetcodeUsername;

    if (req.body.codeforcesUsername !== undefined)
      user.codeforcesUsername = req.body.codeforcesUsername;

    if (req.body.gfgUsername !== undefined)
      user.gfgUsername = req.body.gfgUsername;

    if (req.body.hackerrankUsername !== undefined)
      user.hackerrankUsername = req.body.hackerrankUsername;

    if (req.body.codechefUsername !== undefined)
      user.codechefUsername = req.body.codechefUsername;

    const username = req.body.username?.trim()?.toLowerCase();
    if (username && username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
      });
    }
    if (username && username !== user.username) {
      const existingUser = await User.findOne({
        username,
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }

      const usernameRegex = /^[a-z0-9_]+$/;

      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          success: false,
          message:
            "Username can only contain lowercase letters, numbers and underscores",
        });
      }

      user.username = username;
    }
    const updatedUser = await user.save();

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

const updateActiveSheets = async (req, res) => {
  try {
    const { activeSheets } = req.body;

    const user = await User.findById(req.user._id);

    user.activeSheets = activeSheets;

    await user.save();

    res.status(200).json({
      success: true,

      activeSheets: user.activeSheets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getUserProfileByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const progress = await DSAProgress.findOne({
      userId: user._id,
    });

    const solvedQuestions =
      progress?.questions.filter((q) => q.solved).length || 0;

    res.status(200).json({
      success: true,

      user: {
        name: user.name,
        username: user.username,
        college: user.college,
        branch: user.branch,
        profileImage: user.profileImage,

        githubUsername: user.githubUsername,

        leetcodeUsername: user.leetcodeUsername,

        codeforcesUsername: user.codeforcesUsername,

        codechefUsername: user.codechefUsername,

        gfgUsername: user.gfgUsername,

        hackerrankUsername: user.hackerrankUsername,

        activeSheets: user.activeSheets,
      },

      stats: {
        solvedQuestions,

        activeSheets: user.activeSheets.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "codorbit/profile-images",
        },

        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const user = await User.findById(req.user._id);

    user.profileImage = result.secure_url;

    await user.save();

    res.status(200).json({
      success: true,

      profileImage: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  getUserProfileByUsername,
  updateUserProfile,
  updateActiveSheets,
  uploadProfileImage,
};
