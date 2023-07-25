const logger = require("../../application/logging");
const prismaClient = require("../../application/database");

const getListUser = async (containName) => {
  try {
    const listUser = await prismaClient.user.findMany({
      where: {
        username: {
          contains: containName,
        },
      },
      include: {
        biodata: true,
      },
    });
    return listUser;
  } catch (error) {
    console.log(`ERROR SERVICE LIST ${error}`);
    throw error;
  }
};

module.exports = getListUser;
