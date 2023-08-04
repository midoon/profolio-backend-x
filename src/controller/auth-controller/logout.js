const logger = require("../../application/logging");
const { logoutValidation } = require("../../validation/auth.validation");
const authService = require("../../service/auth.service");

const logout = async (req, res) => {
  const { error, value } = logoutValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation Error",
    });
  }
  const user_id = value.user_id;
  const user = req.user;
  try {
    if (user_id !== user.user_id) throw error;
    const deleteSession = await authService.deleteRefreshToken(user_id);
    return res
      .status(200)
      .send({ status: true, status_code: 200, message: "Success logout" });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Logout Error",
    });
  }
};

module.exports = logout;
