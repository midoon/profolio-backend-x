const prismaClient = require("../../application/database");

const getPortfolio = async (portfolio_id) => {
  try {
    const portfolio = await prismaClient.portfolio.findUnique({
      where: {
        portfolio_id: portfolio_id,
      },
      include: {
        likedBy: true,
        commentedBy: true,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};

module.exports = getPortfolio;
