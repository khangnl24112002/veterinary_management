const Joi = require("joi");

const adminSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/[A-Za-z ]/))
    .required(),
  phoneNumber: Joi.string().pattern(new RegExp(/[0-9]/)).required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
});

const customerSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/[A-Za-z ]/))
    .required(),
  phoneNumber: Joi.string().pattern(new RegExp(/[0-9]/)).required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
});

const drugSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  usage: Joi.string().required(),
  dosage: Joi.string().required(),
});

module.exports = {
  adminSchema,
  customerSchema,
  drugSchema,
};
