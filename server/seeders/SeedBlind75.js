require("dotenv").config();
const DSAQuestion = require("../src/models/DSAQuestion");

const mongoose = require("mongoose");

const arrayQuestions = require("../src/data/blind75/arrays.json");
const binaryQuestions = require("../src/data/blind75/Binary.json");
const dpQuestions = require("../src/data/blind75/dp.json");
const graphQuestions = require("../src/data/blind75/graph.json");
const intervalQuestions = require("../src/data/blind75/interval.json");
const linkedListQuestions = require("../src/data/blind75/LinkedList.json");
const matrixQuestions = require("../src/data/blind75/matrix.json");
const stringQuestions = require("../src/data/blind75/string.json");
const treeQuestions = require("../src/data/blind75/tree.json");
const heapQuestions = require("../src/data/blind75/heap.json");
const backtrackingQuestions = require("../src/data/blind75/Backtracking.json");

const seedBlind75 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const questions = [
      ...arrayQuestions,
      ...binaryQuestions,
      ...dpQuestions,
      ...graphQuestions,
      ...intervalQuestions,
      ...linkedListQuestions,
      ...matrixQuestions,
      ...stringQuestions,
      ...treeQuestions,
      ...heapQuestions,
      ...backtrackingQuestions,
    ];

    await DSAQuestion.insertMany(questions);

    console.log(`✅ ${questions.length} Blind 75 questions inserted`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBlind75();