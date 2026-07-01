const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub,
      email,
      name,
      picture,
    } = payload;

    // Check Existing User
    let user = await User.findOne({ email });

    // ===============================
    // New User
    // ===============================

    if (!user) {
      let username =
        name
          .split(" ")[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "") +
        Math.floor(100 + Math.random() * 900);

      // Ensure username is unique
      while (await User.findOne({ username })) {
        username =
          name
            .split(" ")[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "") +
          Math.floor(100 + Math.random() * 900);
      }

      user = await User.create({
        name,
        email,
        username,

        googleId: sub,
        profileImage: picture,

        authProvider: "google",
        isVerified: true,
      });

      // Create Platform Profile
      await PlatformProfile.create({
        userId: user._id,
      });
    }

    // ===============================
    // Existing User
    // ===============================

    else {
      if (!user.googleId) {
        user.googleId = sub;
      }

      if (!user.profileImage) {
        user.profileImage = picture;
      }

      user.authProvider = "google";
      user.isVerified = true;

      await user.save();

      // Self-healing:
      // Create PlatformProfile if missing
      let platformProfile = await PlatformProfile.findOne({
        userId: user._id,
      });

      if (!platformProfile) {
        await PlatformProfile.create({
          userId: user._id,
        });
      }
    }

    res.status(200).json({
      success: true,

      token: generateToken(user._id),

      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  googleLogin,
};