const getUser = require("./user-service/getUser");
const createBiodata = require("./user-service/createBiodata");
const createAddress = require("./user-service/createAddress");
const createContact = require("./user-service/createContact");

module.exports = {
  getUser,
  createAddress,
  createBiodata,
  createContact,
};
