const jwt = require("jsonwebtoken");
const CONFIG = require("../config/env-config");

const signJwt = (payload, expiresIn) => {
  const token = jwt.sign({ payload }, CONFIG.JWT_KEY, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });

  return token;
};

const verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt is expired or not eligible to use",
      decoded: null,
    };
  }
};

module.exports = {
  signJwt,
  verifyJwt,
};
