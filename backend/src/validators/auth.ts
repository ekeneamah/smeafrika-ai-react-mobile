import * as Joi from 'joi';

export const validateSignup = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    storeName: Joi.string().min(2).required(),
  });

  return schema.validate(data);
};