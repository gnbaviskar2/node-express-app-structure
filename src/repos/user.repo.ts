import moment from 'moment';
import UserModel from '../model/user.model';
import { userPayloadType } from '../interface';
import { responseHandlers } from '../helpers/handlers';

const getUsers = async () => {
  return UserModel.find({}, responseHandlers.userResponseFields);
};

const getUser = async (_id: string) => {
  return UserModel.findOne({ _id });
};

const createUser = async (createUserPayload: userPayloadType) => {
  try {
    const test = await UserModel.create({
      firstname: createUserPayload.firstname,
      lastname: createUserPayload.lastname,
      email: createUserPayload.email,
      password: createUserPayload.password,
      username: createUserPayload.username,
      createdAt: moment(),
      cart: [],
    });
    return test;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

const deleteUser = async (_id: string) => {
  return UserModel.deleteOne({ _id });
};

const getUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export { createUser, getUser, getUsers, deleteUser, getUserByEmail };
