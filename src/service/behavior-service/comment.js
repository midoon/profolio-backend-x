const prismaClient = require("../../application/database");

const comment = async (payload) => {
  try {
    return await prismaClient.comment.create({
      data: payload,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = comment;
