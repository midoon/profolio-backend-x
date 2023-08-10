const prismaClient = require("../../application/database");

const unlike = async (portfolio_id, user_id) => {
  try {
    return await prismaClient.like.deleteMany({
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
    console.log(error);
    throw error;
  }
};

module.exports = unlike;
