const mongoose = require("mongoose");

const arraysHashing = require("../src/data/neetcode150/arrays-hashing.json");
const twoPointers = require("../src/data/neetcode150/two-pointers.json");
const slidingWindow = require("../src/data/neetcode150/sliding-window.json");
const stack = require("../src/data/neetcode150/stack.json");
const binarySearch = require("../src/data/neetcode150/binary-search.json");
const linkedList = require("../src/data/neetcode150/linked-list.json");
const trees = require("../src/data/neetcode150/trees.json");
const tries = require("../src/data/neetcode150/tries.json");
const heapPriorityQueue = require("../src/data/neetcode150/heap-priorityQueue.json");
const backtracking = require("../src/data/neetcode150/backtracking.json");
const graphs = require("../src/data/neetcode150/graphs.json");
const advancedGraphs = require("../src/data/neetcode150/advancedGraphs.json");
const oneDP = require("../src/data/neetcode150/1dp.json");
const twoDP = require("../src/data/neetcode150/2dp.json");
const greedy = require("../src/data/neetcode150/greedy.json");
const intervals = require("../src/data/neetcode150/intervals.json");
const mathAndGeometry = require("../src/data/neetcode150/mathAndGeometry.json");
const bitManipulation = require("../src/data/neetcode150/bit-manipulation.json");

const DSAQuestion = require("../src/models/DSAQuestion");
require("dotenv").config();

const questions = [
  ...arraysHashing,
  ...twoPointers,
  ...slidingWindow,
  ...stack,
  ...binarySearch,
  ...linkedList,
  ...trees,
  ...tries,
  ...heapPriorityQueue,
  ...backtracking,
  ...graphs,
  ...advancedGraphs,
  ...oneDP,
  ...twoDP,
  ...greedy,
  ...intervals,
  ...mathAndGeometry,
  ...bitManipulation,
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await DSAQuestion.deleteMany({
      sheetName: "NeetCode 150",
    });

    await DSAQuestion.insertMany(questions);

    console.log(
      `✅ Seed Complete (${questions.length} questions inserted)`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);

    process.exit(1);
  }
};

seed();