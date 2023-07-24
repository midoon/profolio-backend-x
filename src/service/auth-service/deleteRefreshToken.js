const prismaClient = require("../../application/database");
const logger = require("../../application/logging");

const deleteRefreshToken = async (user_id) => {
  try {
    const deletedToken = await prismaClient.token.delete({
      where: {
        user_id: user_id,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteRefreshToken;
