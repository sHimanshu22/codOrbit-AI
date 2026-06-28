require("dotenv").config();

const mongoose = require("mongoose");
const DSAQuestion = require("../src/models/DSAQuestion");

const arrayQuestions = require("../src/data/loveBabbar/array.json");
const matrixQuestions = require("../src/data/loveBabbar/matrix.json");
const stringQuestions = require("../src/data/loveBabbar/string.json");
const searchingSortingQuestions = require("../src/data/loveBabbar/searching-Sorting.json");
const linkedListQuestions = require("../src/data/loveBabbar/linked-List.json");
const binaryTreeQuestions = require("../src/data/loveBabbar/binary-tree.json");
const bstQuestions = require("../src/data/loveBabbar/bst.json");
const greedyQuestions = require("../src/data/loveBabbar/greedy.json");
const backtrackingQuestions = require("../src/data/loveBabbar/backtracking.json");
const stackQueueQuestions = require("../src/data/loveBabbar/stack-queue.json");
const heapQuestions = require("../src/data/loveBabbar/heap.json");
const graphQuestions = require("../src/data/loveBabbar/graph.json");
const trieQuestions = require("../src/data/loveBabbar/trie.json");
const dpQuestions = require("../src/data/loveBabbar/dynamic-programming.json");
const bitManipulationQuestions = require("../src/data/loveBabbar/bit-manipulation.json");

const SeedLoveBabbar = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const questions = [
      ...arrayQuestions,
      ...matrixQuestions,
      ...stringQuestions,
      ...searchingSortingQuestions,
      ...linkedListQuestions,
      ...binaryTreeQuestions,
      ...bstQuestions,
      ...greedyQuestions,
      ...backtrackingQuestions,
      ...stackQueueQuestions,
      ...heapQuestions,
      ...graphQuestions,
      ...trieQuestions,
      ...dpQuestions,
      ...bitManipulationQuestions,
    ];

    await DSAQuestion.insertMany(questions);

    console.log(
      `✅ ${questions.length} Love Babbar DSA 450 questions inserted`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

SeedLoveBabbar();