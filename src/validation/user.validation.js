const Joi = require("joi");
const updateUserValidation = (payload) => {
  const schema = Joi.object({
    username: Joi.string().max(255).optional(),
    email: Joi.string().max(255).email().optional(),
    study: Joi.string().optional(),
    description: Joi.string().optional(),
    job: Joi.string().optional(),
    country: Joi.string().optional(),
    province: Joi.string().optional(),
    city: Joi.string().optional(),
    postal_code: Joi.string().optional(),
    no_hp: Joi.string().optional(),
    social_media: Joi.string().optional(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

module.exports = { updateUserValidation };
