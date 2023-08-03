const Joi = require("joi");
const createPortfolioValidation = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    tag: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().optional(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

module.exports = { createPortfolioValidation };
