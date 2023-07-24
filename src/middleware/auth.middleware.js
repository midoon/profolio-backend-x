const logger = require("../application/logging");
const { isTokenExistbyUserId } = require("../service/auth.service");
const { verifyJwt } = require("../util/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization?.replace(/^Bearer\s/, "");
    if (!access_token) throw error;
    const token = verifyJwt(access_token);
    if (token.expired) throw error;
    if (!token.valid) throw error;
    if (token.decoded) req.user = token.decoded.payload;
    const countRefreshToken = await isTokenExistbyUserId(
      token.decoded.payload.user_id
    );
    if (countRefreshToken !== 1) throw error;
    return next();
  } catch (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Forbidden",
    });
  }
};

module.exports = authMiddleware;
