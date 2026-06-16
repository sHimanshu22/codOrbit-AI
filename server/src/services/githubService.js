const axios = require("axios");

const fetchGitHubProfile = async (username) => {
  try {
    console.log("Fetching GitHub profile:", username);

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );

    return response.data;
  } catch (error) {
    console.log("GitHub Profile Error:");

    console.log(error.response?.data);

    throw error;
  }
};

const fetchGitHubRepos = async (username) => {
  try {
    console.log("Fetching GitHub repos:", username);

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );

    return response.data;
  } catch (error) {
    console.log("GitHub Repos Error:");

    console.log(error.response?.data);

    throw error;
  }
};

const fetchGitHubEvents = async (
  username
) => {

  try {

    const response =
      await axios.get(
        `https://api.github.com/users/${username}/events?per_page=100`
      );

    return response.data;

  } catch (error) {

    console.log(
      "GitHub Events Error:"
    );

    console.log(
      error.response?.data
    );

    throw error;
  }
};

module.exports = {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubEvents,
};
