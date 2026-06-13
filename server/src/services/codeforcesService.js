const axios = require("axios");

const fetchCodeforcesProfile =
  async (handle) => {
    const response =
      await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );

    return response.data.result[0];
  };

const fetchContestHistory =
  async (handle) => {
    const response =
      await axios.get(
        `https://codeforces.com/api/user.rating?handle=${handle}`
      );

    return response.data.result;
  };

module.exports = {
  fetchCodeforcesProfile,
  fetchContestHistory,
};