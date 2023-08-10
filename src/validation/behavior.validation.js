const Joi = require("joi");
const likeValidation = (payload) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

module.exports = { likeValidation };
