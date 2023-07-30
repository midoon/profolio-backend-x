const logger = require("../../application/logging");
const prismaClient = require("../../application/database");

const updateContact = async (user_id, data_user) => {
  try {
    return await prismaClient.contact.update({
      where: {
        user_id: user_id,
      },
      data: data_user,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = updateContact;
