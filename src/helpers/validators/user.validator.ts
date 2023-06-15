import joi from 'joi';

import { userPayloadType } from '../../interface';

const validateCreateUser = (userCreatePayload: userPayloadType) => {
  const userSchema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().required(),
    cart: joi.array().required(),
  });

  return userSchema.validate(userCreatePayload);
};

export { validateCreateUser };
