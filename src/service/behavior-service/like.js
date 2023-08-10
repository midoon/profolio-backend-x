const prismaClient = require("../../application/database");

const like = async (payload) => {
  try {
    return await prismaClient.like.create({
      data: payload,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = like;
