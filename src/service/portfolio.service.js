const createPortfolio = require("./portfolio-service/createPortfolio");
const getPortfolio = require("./portfolio-service/getPortfolio");
const getAllPortfolio = require("./portfolio-service/getAllPortfolio");
const updatePortfolio = require("./portfolio-service/updatePortfolio");
const deletePortfolio = require("./portfolio-service/deletePortfolio");

module.exports = {
  createPortfolio,
  getPortfolio,
  getAllPortfolio,
  updatePortfolio,
  deletePortfolio,
};
