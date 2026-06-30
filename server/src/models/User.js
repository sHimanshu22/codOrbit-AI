const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    graduationYear: {
      type: Number,
    },

    profileImage: {
      type: String,
      default: "",
    },

    googleId: {
      type: String,
      default: "",
    },

    githubUsername: {
      type: String,
      default: "",
    },

    leetcodeUsername: {
      type: String,
      default: "",
    },

    codeforcesUsername: {
      type: String,
      default: "",
    },

    gfgUsername: {
      type: String,
      default: "",
    },

    hackerrankUsername: {
      type: String,
      default: "",
    },

    codechefUsername: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    activeSheets: {
      type: [String],
      default: ["Striver A2Z"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);