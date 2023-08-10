const logger = require("../../application/logging");
const prismaClient = require("../../application/database");

const getUser = async (user_id) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        user_id: user_id,
      },

      include: {
        biodata: true,
        contact: true,
        address: true,
        portfolios: true,
        bookmarks: true,
        followings: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = getUser;
