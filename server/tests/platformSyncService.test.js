const test = require("node:test");
const assert = require("node:assert/strict");

const { buildActivitySnapshotUpdate } = require("../src/services/platformSyncService");

test("buildActivitySnapshotUpdate uses the latest platform values", () => {
  const profile = {
    github: { publicRepos: 12, totalStars: 34 },
    leetcode: { totalSolved: 250 },
    codeforces: { contestCount: 9 },
  };

  const update = buildActivitySnapshotUpdate(profile);

  assert.deepEqual(update, {
    leetcodeSolved: 250,
    githubRepos: 12,
    githubStars: 34,
    codeforcesContests: 9,
  });
});

test("buildActivitySnapshotUpdate defaults missing values to zero", () => {
  const update = buildActivitySnapshotUpdate({});

  assert.deepEqual(update, {
    leetcodeSolved: 0,
    githubRepos: 0,
    githubStars: 0,
    codeforcesContests: 0,
  });
});
