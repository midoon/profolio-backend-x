const prismaClient = require("../../application/database");

const userIsExistById = async (user_id) => {
  try {
    return await prismaClient.user.count({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = userIsExistById;
