const prismaClient = require("../../application/database");
const logger = require("../../application/logging");

const isTokenExistbyUserId = async (user_id) => {
  try {
    const countToken = await prismaClient.token.count({
      where: {
        user_id: user_id,
      },
    });
    return countToken;
  } catch (error) {
    throw error;
  }
};

module.exports = isTokenExistbyUserId;
