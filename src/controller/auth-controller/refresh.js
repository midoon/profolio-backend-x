const authService = require("../../service/auth.service");
const { refreshTokenValidation } = require("../../validation/auth.validation");
const { verifyJwt, signJwt } = require("../../util/jwt");
const logger = require("../../application/logging");

const refresh = async (req, res) => {
  const { error, value } = refreshTokenValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation Error",
    });
  }
  const token = value;
  try {
    const { decoded } = verifyJwt(token.refresh_token);
    const email = decoded.payload.email;
    const user_id = decoded.payload.user_id;
    const username = decoded.payload.username;

    const countToken = await authService.isTokenExistbyToken(
      token.refresh_token
    );
    if (countToken !== 1) throw error;

    const dataToken = {
      user_id,
      email,
      username,
    };
    const access_token = signJwt({ ...dataToken }, "1d");
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success Get Access Token",
      data: { access_token },
    });
  } catch (error) {
    logger.error(`ERROR REFRESH`);
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Refresh Error",
    });
  }
};

module.exports = refresh;
