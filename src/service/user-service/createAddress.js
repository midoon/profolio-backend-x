const prismaClient = require("../../application/database");

const createAddress = async (payload) => {
  try {
    const result = await prismaClient.address.create({
      data: payload,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = createAddress;
