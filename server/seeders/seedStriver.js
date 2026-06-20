const mongoose = require("mongoose");

const learnBasics = require("../src/data/striverA2Z/learn-basics.json");
const sorting = require("../src/data/striverA2Z/sorting.json");
const arrays = require("../src/data/striverA2Z/arrays.json");
const binarySearchTrees = require("../src/data/striverA2Z/binary-Search-Trees.json");
const binarySearch = require("../src/data/striverA2Z/binary-search.json");
const binaryTrees = require("../src/data/striverA2Z/binaryTrees.json");
const bitManipulation = require("../src/data/striverA2Z/bit-Manipulation.json");
const dp = require("../src/data/striverA2Z/dp.json");
const graphs = require("../src/data/striverA2Z/graphs.json");
const greedy = require("../src/data/striverA2Z/greedy.json");
const heaps = require("../src/data/striverA2Z/heaps.json");
const linkedList = require("../src/data/striverA2Z/linked-list.json");
const recursion = require("../src/data/striverA2Z/recursion.json");
const slidingTwoPointer = require("../src/data/striverA2Z/SlidingTwoPointer.json");
const stackQueue = require("../src/data/striverA2Z/stack-Queue.json");
const stringsEasyMedium = require("../src/data/striverA2Z/strings-Easy-Medium.json");
const stringsHard = require("../src/data/striverA2Z/strings-Hard.json");
const tries = require("../src/data/striverA2Z/tries.json");

const DSAQuestion = require("../src/models/DSAQuestion");
require("dotenv").config();

const questions = [
  ...learnBasics,
  ...sorting,
  ...arrays,
  ...binarySearchTrees,
  ...binarySearch,
  ...binaryTrees,
  ...bitManipulation,
  ...dp,
  ...graphs,
  ...greedy,
  ...heaps,
  ...linkedList,
  ...recursion,
  ...slidingTwoPointer,
  ...stackQueue,
  ...stringsEasyMedium,
  ...stringsHard,
  ...tries,
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const question of questions) {
      await DSAQuestion.updateOne(
        {
          sheetName: question.sheetName,
          module: question.module,
          title: question.title,
        },
        {
          $set: question,
        },
        {
          upsert: true,
        },
      );
    }

    console.log(`✅ Seed Complete (${questions.length} questions inserted)`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);

    process.exit(1);
  }
};

seed();
