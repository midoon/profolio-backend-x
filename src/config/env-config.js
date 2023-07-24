require("dotenv").config();

const CONFIG = {
  JWT_KEY: process.env.JWT_KEY,
};

module.exports = CONFIG;
