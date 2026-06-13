const { request, gql } =
  require("graphql-request");

const fetchLeetCodeStats =
  async (username) => {
    const endpoint =
      "https://leetcode.com/graphql";

    const query = gql`
      query userProblemsSolved(
        $username: String!
      ) {
        matchedUser(
          username: $username
        ) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const data =
      await request(
        endpoint,
        query,
        {
          username,
        }
      );

    return data;
  };

module.exports = {
  fetchLeetCodeStats,
};