const prismaClient = require("../../application/database");

const createContact = async (payload) => {
  try {
    const result = await prismaClient.contact.create({
      data: payload,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = createContact;
