import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  role_id: Joi.number().required(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{12}$")).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).optional(),
  name: Joi.string().max(100).optional(),
  email: Joi.string().email().max(100).optional(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{12}$")).optional(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
