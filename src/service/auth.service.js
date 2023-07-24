const register = require("./auth-service/register");
const login = require("./auth-service/login");
const isUserExist = require("./auth-service/isUserExist");
const createRefreshToken = require("./auth-service/createResfreshToken");
const deleteRefreshToken = require("./auth-service/deleteRefreshToken");
const isTokenExistbyUserId = require("./auth-service/isTokenExistbyUserId");
const isTokenExistbyToken = require("./auth-service/isTokenExistbyToken");

module.exports = {
  register,
  login,
  isUserExist,
  createRefreshToken,
  deleteRefreshToken,
  isTokenExistbyUserId,
  isTokenExistbyToken,
};
