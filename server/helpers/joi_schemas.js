const Joi = require("joi");

const adminSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/[A-Za-z ]/))
    .required(),
  phoneNumber: Joi.string().pattern(new RegExp(/[0-9]/)).required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = {
  adminSchema,
};
