const getUser = require("./user-service/getUser");
const createBiodata = require("./user-service/createBiodata");
const createAddress = require("./user-service/createAddress");
const createContact = require("./user-service/createContact");
const getListUser = require("./user-service/getListUser");
const updateAddress = require("./user-service/updateAddress");
const updateBiodata = require("./user-service/updateBiodata");
const updateContact = require("./user-service/updateContact");
const getBiodata = require("./user-service/getBiodata");

module.exports = {
  getUser,
  createAddress,
  createBiodata,
  createContact,
  getListUser,
  updateAddress,
  updateBiodata,
  updateContact,
  getBiodata,
};
