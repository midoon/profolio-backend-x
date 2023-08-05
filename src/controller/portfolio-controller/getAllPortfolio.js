const portfolioService = require("../../service/portfolio.service");

const getAllPortfolio = async (req, res) => {
  const page = req.query.page ? req.query.page : 0;
  const tag = req.query.tag ? req.query.tag : "";
  const size = 10;
  // to mitigate negative page
  const dataPageQuery = {
    tag: tag,
    page: page <= 0 ? 1 : page,
    size,
  };
  try {
    const portfolios = await portfolioService.getAllPortfolio(dataPageQuery);
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success get list portfolio",
      data: {
        portfolios: portfolios.dataPortfolios,
        paging: portfolios.paging,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Get list Portfolio Error",
    });
  }
};

module.exports = getAllPortfolio;
