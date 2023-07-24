const bcrypt = require("bcrypt");

const encode = async (payload, complexity) => {
  try {
    const result = await bcrypt.hash(payload, complexity);
    return result;
  } catch (error) {
    throw error;
  }
};

const decode = (password, userPasswordDB) => {
  return bcrypt.compareSync(password, userPasswordDB);
};

module.exports = { encode, decode };
