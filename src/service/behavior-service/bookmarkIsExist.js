const prismaClient = require("../../application/database");

const bookmark = async (portfolio_id, user_id) => {
  try {
    const countPortfolio = await prismaClient.bookmark.count({
      where: {
        AND: [
          {
            portfolio_id: portfolio_id,
          },
          {
            user_id: user_id,
          },
        ],
      },
    });
    return countPortfolio;
  } catch (error) {
    throw error;
  }
};

module.exports = bookmark;
