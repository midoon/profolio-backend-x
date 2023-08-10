const prismaClient = require("../../application/database");

const unBookmark = async (portfolio_id, user_id) => {
  try {
    return await prismaClient.bookmark.deleteMany({
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
  } catch (error) {
    throw error;
  }
};

module.exports = unBookmark;
