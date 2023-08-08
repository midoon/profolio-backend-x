const createPortfolio = require("./portfolio-controller/createPortfolio");
const getPortfolio = require("./portfolio-controller/getPortfolio");
const getAllPortfolio = require("./portfolio-controller/getAllPortfolio");
const updatePortfolio = require("./portfolio-controller/updatePortfolio");
const deletePortfolio = require("./portfolio-controller/deletePortfolio");

module.exports = {
  createPortfolio,
  getPortfolio,
  getAllPortfolio,
  updatePortfolio,
  deletePortfolio,
};
