const prismaClient = require("../../application/database");

const bookmark = async (payload) => {
  try {
    return await prismaClient.bookmark.create({
      data: payload,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = bookmark;
