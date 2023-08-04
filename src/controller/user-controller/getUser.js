const logger = require("../../application/logging");
const userService = require("../../service/user.service");

const getUser = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await userService.getUser(user_id);
    const dataRes = user;
    delete dataRes.password;
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success get user data",
      data: dataRes,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Get User Error",
    });
  }
};

module.exports = getUser;
