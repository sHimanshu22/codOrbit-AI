const mongoose = require("mongoose");

const arrays = require("../src/data/striverSDE/arrays.json");
const arraysPart2 = require("../src/data/striverSDE/arraysPart2.json");
const arraysPart3 = require("../src/data/striverSDE/arraysPart3.json");
const arraysPart4 = require("../src/data/striverSDE/arraysPart4.json");

const linkedListPart1 = require("../src/data/striverSDE/Linked-ListPart1.json");
const linkedListPart2 = require("../src/data/striverSDE/Linked-ListPart2.json");
const linkedListArrays = require("../src/data/striverSDE/LinkedList-Arrays.json");

const greedyAlgorithms = require("../src/data/striverSDE/greedyAlgorithms.json");

const recursion = require("../src/data/striverSDE/recursion.json");
const recursionBacktracking = require("../src/data/striverSDE/recursion-backtracking.json");

const binarySearch = require("../src/data/striverSDE/binary-search.json");

const heaps = require("../src/data/striverSDE/heaps.json");

const stackQueue = require("../src/data/striverSDE/stackQueue.json");
const stackQueuePart = require("../src/data/striverSDE/stackQueuePart.json");

const strings = require("../src/data/striverSDE/strings.json");
const stringsPart2 = require("../src/data/striverSDE/stringsPart2.json");

const binaryTree = require("../src/data/striverSDE/binary-tree.json");
const binaryTreePart2 = require("../src/data/striverSDE/binary-treePart2.json");
const binaryTreePart3 = require("../src/data/striverSDE/binary-treePart3.json");
const binaryTreeMiscellaneous = require("../src/data/striverSDE/binaryTreeMiscellaneous.json");

const binarySearchTreesPart1 = require("../src/data/striverSDE/binarySearchTreesPart1.json");
const binarySearchTreesPart2 = require("../src/data/striverSDE/binarySearchTreePart2.json");

const graphs = require("../src/data/striverSDE/graphs.json");
const graphsPart2 = require("../src/data/striverSDE/graphsPart2.json");

const dp = require("../src/data/striverSDE/dp.json");
const dpPart2 = require("../src/data/striverSDE/dpPart2.json");

const trie = require("../src/data/striverSDE/trie.json");

const DSAQuestion = require("../src/models/DSAQuestion");

require("dotenv").config();

const questions = [
  ...arrays,
  ...arraysPart2,
  ...arraysPart3,
  ...arraysPart4,

  ...linkedListPart1,
  ...linkedListPart2,
  ...linkedListArrays,

  ...greedyAlgorithms,

  ...recursion,
  ...recursionBacktracking,

  ...binarySearch,

  ...heaps,

  ...stackQueue,
  ...stackQueuePart,

  ...strings,
  ...stringsPart2,

  ...binaryTree,
  ...binaryTreePart2,
  ...binaryTreePart3,
  ...binaryTreeMiscellaneous,

  ...binarySearchTreesPart1,
  ...binarySearchTreesPart2,

  ...graphs,
  ...graphsPart2,

  ...dp,
  ...dpPart2,

  ...trie,
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await DSAQuestion.deleteMany({
      sheetName: "Striver SDE Sheet",
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