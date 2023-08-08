const prismaClient = require("../../application/database");

const deletePortfolio = async (portfolio_id) => {
  try {
    return await prismaClient.portfolio.delete({
      where: {
        portfolio_id: portfolio_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = deletePortfolio;
