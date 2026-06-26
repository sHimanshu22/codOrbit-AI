const axios = require("axios");
const cheerio = require("cheerio");

const fetchCodeChefProfile = async (username) => {
  try {
  
    const { data } = await axios.get(
      `https://www.codechef.com/users/${username}`,
    );

    const $ = cheerio.load(data);

    const ratingText = $(".rating-number").first().text().trim();

    const stars = $(".rating").first().text().trim();

    const highestRatingMatch = $("small")
      .text()
      .match(/Highest Rating\s+(\d+)/);

    const globalRankText = $(".rating-ranks strong")
      .eq(0)
      .text()
      .replace(/[^\d]/g, "");

    const countryRankText = $(".rating-ranks strong")
      .eq(1)
      .text()
      .replace(/[^\d]/g, "");

    return {
      username,

      currentRating: Number(ratingText) || 0,

      highestRating: highestRatingMatch ? Number(highestRatingMatch[1]) : 0,

      stars,

      globalRank: Number(globalRankText) || 0,

      countryRank: Number(countryRankText) || 0,
    };
  } catch (error) {
    console.log("CodeChef Profile Error:");

    console.log(error.message);

    throw error;
  }
};

module.exports = {
  fetchCodeChefProfile,
};
