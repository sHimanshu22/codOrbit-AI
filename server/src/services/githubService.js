const axios = require("axios");

const fetchGitHubProfile =
  async (username) => {
    const response =
      await axios.get(
        `https://api.github.com/users/${username}`
      );

    return response.data;
  };

const fetchGitHubRepos =
  async (username) => {
    const response =
      await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );

    return response.data;
  };

module.exports = {
  fetchGitHubProfile,
  fetchGitHubRepos,
};