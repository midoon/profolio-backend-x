const prismaClient = require("../../application/database");

const follow = async (payload) => {
  try {
    return await prismaClient.follower.create({
      data: payload,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = follow;
