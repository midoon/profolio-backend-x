const prismaClient = require("../../application/database");

const followIsExist = async (followed_uid, following_uid) => {
  try {
    const countFollow = await prismaClient.follower.count({
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
    return countFollow;
  } catch (error) {
    throw error;
  }
};

module.exports = followIsExist;
