const prismaClient = require("../application/database");

const healtCheckController = async (req, res) => {
  const userCount = await prismaClient.user.count();
  res.send({ user: userCount });
};

module.exports = healtCheckController;
