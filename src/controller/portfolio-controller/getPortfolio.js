const portfolioService = require("../../service/portfolio.service");
const logger = require("../../application/logging");

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.getPortfolio(
      req.params.portfolio_id
    );
    if (portfolio === null) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Portfolio Not Found",
      });
    }
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success get data portfolio",
      data: portfolio,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Get Portfolio Error",
    });
  }
};

module.exports = getPortfolio;
