const portfolioService = require("../../service/portfolio.service");
const logger = require("../../application/logging");

const {
  createPortfolioValidation,
} = require("../../validation/profolio.validation");
const uploadImage = require("../../util/uploadImage");
const { v4 } = require("uuid");

const createPortfolio = async (req, res) => {
  try {
    const { error, value } = createPortfolioValidation(req.body);
    if (error) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Validation Error",
      });
    }

    let portfolioImageUrl = null;
    if (req.file) {
      portfolioImageUrl = await uploadImage(req.file);
    }

    const dataPortfolio = {
      portfolio_id: v4().toString(),
      user_id: req.user.user_id,
      image: portfolioImageUrl,
      title: value.title,
      tag: value.tag,
      link: value.link,
      description: value.description,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const portfolio = await portfolioService.createPortfolio(dataPortfolio);
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success Create Portfolio Data",
    });
  } catch (error) {
    logger.error(`ERROR CREATE PORTFOLIO`);
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Create Portfolio Error",
    });
  }
};

module.exports = createPortfolio;
