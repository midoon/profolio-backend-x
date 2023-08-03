const portfolioService = require("../../service/portfolio.service");
const logger = require("../../application/logging");

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.getPortfolio(
      req.params.portfolio_id
    );
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success get data portfolio",
      data: portfolio,
    });
  } catch (error) {
    logger.error(`ERROR GET PORTFOLIO `);
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Get Portfolio Error",
    });
  }
};

module.exports = getPortfolio;