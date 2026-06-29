require("dotenv").config();
const mongoose = require("mongoose");
const DSAQuestion = require("../src/models/DSAQuestion");

// Import all Blind 75 modules
const arraysStringsQuestions = require("../src/data/blind75/arrays-strings.json");
const backtrackingQuestions = require("../src/data/blind75/Backtracking.json");
const binarySearchTreeQuestions = require("../src/data/blind75/binary-search-tree.json");
const binaryTreeBFSQuestions = require("../src/data/blind75/binary-Tree-BFS.json");
const binaryTreeDFSQuestions = require("../src/data/blind75/binary-Tree-DFS.json");
const binarySearchQuestions = require("../src/data/blind75/BinarySearch.json");
const bitManipulationQuestions = require("../src/data/blind75/bit-manipulation.json");
const dp1Questions = require("../src/data/blind75/dp1.json");
const dpMultiQuestions = require("../src/data/blind75/dpMulti.json");
const graphBFSQuestions = require("../src/data/blind75/graph-BFS.json");
const graphDFSQuestions = require("../src/data/blind75/graph-DFS.json");
const hashMapSetQuestions = require("../src/data/blind75/hashMap-set.json");
const heapPriorityQueueQuestions = require("../src/data/blind75/heap-priorityQueue.json");
const intervalQuestions = require("../src/data/blind75/interval.json");
const linkedListQuestions = require("../src/data/blind75/LinkedList.json");
const monotonicStackQuestions = require("../src/data/blind75/monotonic-stack.json");
const prefixQuestions = require("../src/data/blind75/prefix.json");
const queueQuestions = require("../src/data/blind75/queue.json");
const slidingWindowQuestions = require("../src/data/blind75/sliding-window.json");
const stackQuestions = require("../src/data/blind75/stack.json");
const triesQuestions = require("../src/data/blind75/tries.json");
const twoPointersQuestions = require("../src/data/blind75/two-pointers.json");

const seedBlind75 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const questions = [
      ...arraysStringsQuestions,
      ...backtrackingQuestions,
      ...binarySearchTreeQuestions,
      ...binaryTreeBFSQuestions,
      ...binaryTreeDFSQuestions,
      ...binarySearchQuestions,
      ...bitManipulationQuestions,
      ...dp1Questions,
      ...dpMultiQuestions,
      ...graphBFSQuestions,
      ...graphDFSQuestions,
      ...hashMapSetQuestions,
      ...heapPriorityQueueQuestions,
      ...intervalQuestions,
      ...linkedListQuestions,
      ...monotonicStackQuestions,
      ...prefixQuestions,
      ...queueQuestions,
      ...slidingWindowQuestions,
      ...stackQuestions,
      ...triesQuestions,
      ...twoPointersQuestions,
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