const logger = require("../../application/logging");
const prismaClient = require("../../application/database");

const updateUser = async (user_id, data_user) => {
  try {
    return await prismaClient.user.update({
      where: {
        user_id: user_id,
      },
      data: data_user,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = updateUser;
