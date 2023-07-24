const Joi = require("joi");
const registerUserValidation = (payload) => {
  const schema = Joi.object({
    username: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).min(8).required(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

const loginUserValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).min(8).required(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

const refreshTokenValidation = (payload) => {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });
  return schema.validate(payload, { abortEarly: false });
};

const logoutValidation = (payload) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
module.exports = {
  registerUserValidation,
  loginUserValidation,
  refreshTokenValidation,
  logoutValidation,
};
