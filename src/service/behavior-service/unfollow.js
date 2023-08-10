const prismaClient = require("../../application/database");

const unfollow = async (followed_uid, following_uid) => {
  try {
    return await prismaClient.follower.deleteMany({
      where: {
        AND: [
          {
            followed_user_id: followed_uid,
          },
          {
            user_id: following_uid,
          },
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = unfollow;
