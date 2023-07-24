const prismaClient = require("../../application/database");

const isUserExist = async (email) => {
  try {
    const countUser = await prismaClient.user.count({
      where: {
        email: email,
      },
    });
    return countUser;
  } catch (e) {
    throw e;
  }
};

module.exports = isUserExist;
