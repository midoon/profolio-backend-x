const deleteImage = require("../../util/deleteImage");
const portfolioService = require("../../service/portfolio.service");

const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.getPortfolio(
      req.params.portfolio_id
    );

    if (portfolio.user_id !== req.user.user_id) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Unauthorized",
      });
    }

    if (portfolio.image !== null) {
      await deleteImage(portfolio.image);
    }

    await portfolioService.deletePortfolio(req.params.portfolio_id);

    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success Delete Portfolio",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Delete Portfolio Error",
    });
  }
};

module.exports = deletePortfolio;
