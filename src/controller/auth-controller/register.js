const authService = require("../../service/auth.service");
const userService = require("../../service/user.service");
const { registerUserValidation } = require("../../validation/auth.validation");
const { encode } = require("../../util/hasing");
const { v4 } = require("uuid");
const logger = require("../../application/logging");

const register = async (req, res) => {
  const { error, value } = registerUserValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation Error",
    });
  }
  const user = value;
  try {
    const countUser = await authService.isUserExist(user.email);
    if (countUser === 1) {
      return res.status(400).send({
        status: false,
        status_code: 400,
        message: "User already exists",
      });
    }

    user.user_id = v4().toString();
    user.password = await encode(user.password, 10);
    user.created_at = new Date();
    user.updated_at = user.created_at;

    const userRegistered = await authService.register(user);

    const userBio = {
      biodata_id: v4().toString(),
      user_id: user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const biodata = await userService.createBiodata(userBio);

    const userAddress = {
      address_id: v4().toString(),
      user_id: user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const address = await userService.createAddress(userAddress);

    const userContact = {
      contact_id: v4().toString(),
      user_id: user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const contact = await userService.createContact(userContact);

    res.status(201).json({
      status: true,
      status_code: 201,
      message: "Success Registration",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Registration Error",
    });
  }
};

module.exports = register;
