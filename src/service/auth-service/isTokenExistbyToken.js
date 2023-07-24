const prismaClient = require("../../application/database");
const logger = require("../../application/logging");

const isTokenExistbyToken = async (token) => {
  try {
    const countToken = await prismaClient.token.count({
      where: {
        refresh_token: token,
      },
    });
    return countToken;
  } catch (error) {
    throw error;
  }
};

module.exports = isTokenExistbyToken;
