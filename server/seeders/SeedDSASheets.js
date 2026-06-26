const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DSASheet = require("../src/models/DSASheet");
const sheets = require("../src/data/dsaSheets");

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await DSASheet.deleteMany();

  await DSASheet.insertMany(sheets);

  console.log("DSA Sheets Seeded");

  process.exit();
};

seed();
