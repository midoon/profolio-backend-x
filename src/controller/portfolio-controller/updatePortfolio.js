const uploadImage = require("../../util/uploadImage");
const deleteImage = require("../../util/deleteImage");
const portfolioService = require("../../service/portfolio.service");
const {
  updatePortfolioValidation,
} = require("../../validation/profolio.validation");
const updatePortfolio = async (req, res) => {
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
    const { error, value } = updatePortfolioValidation(req.body);
    if (error) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Validation Error",
      });
    }

    let imageUrl = portfolio.image !== null ? portfolio.image : null;

    if (req.file && imageUrl !== null) {
      await deleteImage(imageUrl);
      imageUrl = await uploadImage(req.file);
    }
    if (req.file && imageUrl === null) {
      imageUrl = await uploadImage(req.file);
    }

    const dataUpdate = value;
    dataUpdate.image = imageUrl;
    dataUpdate.updated_at = new Date();

    const newPortfolio = await portfolioService.updatePortfolio(
      req.params.portfolio_id,
      dataUpdate
    );

    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success update portfolio",
      data: {
        portfolio_id: newPortfolio.portfolio_id,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Update Portfolio Error",
    });
  }
};

module.exports = updatePortfolio;
