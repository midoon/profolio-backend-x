const prismaClient = require("../../application/database");

const updatePortfolio = async (portfolio_id, data_update) => {
  try {
    const portfolio = await prismaClient.portfolio.update({
      where: {
        portfolio_id: portfolio_id,
      },
      data: data_update,
      select: {
        portfolio_id: true,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};

module.exports = updatePortfolio;
