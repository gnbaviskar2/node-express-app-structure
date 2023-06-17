import joi from 'joi';
import { userPayloadType } from '../../interface';
import { userErrorConstants } from '../../core/constants';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_])[A-Za-z\!@#$%^&*()-_]{8,}$/;

const validateCreateUser = (userCreatePayload: userPayloadType) => {
  const userSchema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    username: joi.string().required(),
    password: joi
      .string()
      .required()
      .min(8)
      .max(50)
      .pattern(new RegExp(passwordRegex))
      .messages({
        'string.min': 'min',
        'string.max': 'max',
        'string.pattern.base': userErrorConstants.inValidPassword,
        'any.required': userErrorConstants.passwordRequired,
      }),
    email: joi.string().lowercase().pattern(new RegExp(emailRegex)).messages({
      'string.pattern.base': userErrorConstants.inValidEmail,
      'any.required': userErrorConstants.emailRequired,
    }),
    cart: joi.array().required(),
  });

  return userSchema.validate(userCreatePayload);
};

export { validateCreateUser };
