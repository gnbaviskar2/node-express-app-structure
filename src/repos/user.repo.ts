import moment from 'moment';
import UserModel from '../model/user.model';
import { userPayloadType } from '../interface';
import { responseHandlers } from '../helpers/handlers';
import AppError, { HttpCodeEnum } from '../helpers/handlers/api.error.handler';

const getUsers = () => {
  return UserModel.find({}, responseHandlers.userResponseFields);
};

const getUser = (_id: string) => {
  return UserModel.findOne({ _id }).populate('cart');
};

const createUser = async (createUserPayload: userPayloadType) => {
  try {
    const user = await UserModel.create({
      firstname: createUserPayload.firstname,
      lastname: createUserPayload.lastname,
      email: createUserPayload.email,
      password: createUserPayload.password,
      username: createUserPayload.username,
      createdAt: moment(),
      cart: [],
    });
    return user;
  } catch (e: any) {
    if (e.code === 11000) {
      if (e.message.includes('username_')) {
        throw new AppError({
          httpCode: HttpCodeEnum.BAD_REQUEST,
          description: 'Username already registered',
        });
      } else if (e.message.includes('email_')) {
        throw new AppError({
          httpCode: HttpCodeEnum.BAD_REQUEST,
          description: 'Email already registered',
        });
      }
    }
  }
};

const deleteUser = (_id: string) => {
  return UserModel.deleteOne({ _id });
};

const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export { createUser, getUser, getUsers, deleteUser, getUserByEmail };
