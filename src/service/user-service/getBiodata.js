const prismaClient = require("../../application/database");

const getBiodata = async (user_id) => {
  try {
    const biodata = await prismaClient.biodata.findUnique({
      where: {
        user_id: user_id,
      },
    });
    return biodata;
  } catch (error) {
    throw error;
  }
};

module.exports = getBiodata;
