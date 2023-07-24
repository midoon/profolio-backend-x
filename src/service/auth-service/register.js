const prismaClient = require("../../application/database");

const register = async (payload) => {
  try {
    const result = await prismaClient.user.create({
      data: payload,
      select: {
        user_id: true,
        username: true,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = register;
