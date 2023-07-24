const prismaClient = require("../../application/database");
const { signJwt } = require("../../util/jwt");
const { v4 } = require("uuid");

const createRefreshToken = async (payload) => {
  try {
    const refresh_token = signJwt(payload, "3d");
    const data = {
      token_id: v4().toString(),
      refresh_token: refresh_token,
      user_id: payload.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const token = await prismaClient.token.create({
      data: data,
      select: {
        refresh_token: true,
      },
    });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = createRefreshToken;
