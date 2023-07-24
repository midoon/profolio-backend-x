const prismaClient = require("../../application/database");

const login = async (email) => {
  try {
    const result = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
      select: {
        user_id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = login;
