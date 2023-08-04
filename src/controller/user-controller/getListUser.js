const logger = require("../../application/logging");
const userService = require("../../service/user.service");

const getListUser = async (req, res) => {
  try {
    if (req.query.name) {
      const listUser = await userService.getListUser(req.query.name);
      const listUserResponse = [];
      listUser.forEach((data) => {
        listUserResponse.push({
          user_id: data.user_id,
          username: data.username,
          image: data.biodata.image,
        });
      });
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Success get list user",
        data: listUserResponse,
      });
    } else {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Success get list user",
        data: [],
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Get List User Error",
    });
  }
};

module.exports = getListUser;
