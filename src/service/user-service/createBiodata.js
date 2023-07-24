const prismaClient = require("../../application/database");

const createBiodata = async (payload) => {
  try {
    const result = await prismaClient.biodata.create({
      data: payload,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = createBiodata;
