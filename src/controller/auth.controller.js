const register = require("./auth-controller/register");
const login = require("./auth-controller/login");
const refresh = require("./auth-controller/refresh");
const logout = require("./auth-controller/logout");

module.exports = {
  register,
  login,
  refresh,
  logout,
};
