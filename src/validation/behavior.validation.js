const Joi = require("joi");
const commentValidation = (payload) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

module.exports = { commentValidation };
