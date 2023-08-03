const prismaClient = require("../../application/database");

const createPortfolio = async (payload) => {
  try {
    const portfolio = await prismaClient.portfolio.create({
      data: payload,
      select: {
        portfolio_id: true,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};

module.exports = createPortfolio;
