const { loginUserValidation } = require("../../validation/auth.validation");
const authService = require("../../service/auth.service");
const logger = require("../../application/logging");
const { decode } = require("../../util/hasing");
const { signJwt } = require("../../util/jwt");

const login = async (req, res) => {
  const { error, value } = loginUserValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation Error",
    });
  }
  const user = value;
  try {
    // cek user by email
    const logedUser = await authService.login(user.email);
    if (logedUser === null) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Wrong email or password",
      });
    }
    //validate the password
    const validPassword = decode(user.password, logedUser.password);
    if (!validPassword) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Wrong email or password",
      });
    }

    // check is exists token based on user_id
    const countToken = await authService.isTokenExistbyUserId(
      logedUser.user_id
    );
    if (countToken === 1) {
      await authService.deleteRefreshToken(logedUser.user_id);
    }

    const dataToken = {
      user_id: logedUser.user_id,
      username: logedUser.username,
      email: logedUser.email,
    };

    const { refresh_token } = await authService.createRefreshToken({
      ...dataToken,
    });
    const access_token = signJwt({ ...dataToken }, "1d");

    const dataResponse = {
      user_id: logedUser.user_id,
      refresh_token,
      access_token,
    };
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success login",
      data: dataResponse,
    });
  } catch (error) {
    logger.error(`ERROR LOGIN `);
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Login Error",
    });
  }
};

module.exports = login;
