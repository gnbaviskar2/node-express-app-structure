import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import base64 from 'base-64';
import { httpCodes } from '../core/constants';
import { userRepo } from '../repos';
import { userPayloadType } from '../interface';
import { userValidators } from '../helpers/validators';
import { responseHandlers } from '../helpers/handlers';

const createUser = async (req: Request, res: Response) => {
  const payload: userPayloadType = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    cart: [],
  };

  // decode password
  payload.password = base64.decode(payload.password);

  // hash password
  payload.password = await bcrypt.hash(payload.password, 10);

  const isValidInput = userValidators.validateCreateUser(payload);
  if (isValidInput.error) {
    // TODO: remove after error handling
    console.log(`validation error: ${isValidInput.error.message}`);
    throw new Error(isValidInput.error.message);
  }

  const userCreated = await userRepo.createUser(payload);
  return res
    .status(httpCodes.OK)
    .json(responseHandlers.responseUserData(userCreated));
  // return res.status(httpCodes.OK).json('something is wrong');
};

const getUser = async (req: Request, res: Response) => {
  const user = await userRepo.getUser(req.params._id);
  if (user) {
    return res
      .status(httpCodes.OK)
      .json(responseHandlers.responseUserData(user));
  }
  return res.status(httpCodes.OK).json('failed');
};

const getUsers = async (req: Request, res: Response) => {
  const users = await userRepo.getUsers();
  return res.status(httpCodes.OK).json(users);
};

const loginUser = async (req: Request, res: Response) => {
  const user = await userRepo.getUserByEmail(req.body.email);
  if (!user) {
    console.log('no user found');
    throw new Error('no user found');
  }

  // decode password
  const password = base64.decode(req.body.password);
  const isCorrectUser = await bcrypt.compare(password, user.password);
  if (!isCorrectUser) {
    console.log('incorrect username/ password');
    throw new Error('incorrect username/ password');
  }
  return res.status(httpCodes.OK).json(responseHandlers.responseUserData(user));
};

const deleteUser = async (req: Request, res: Response) => {
  const delResult = await userRepo.deleteUser(req.params._id);
  return res.status(httpCodes.OK).json(delResult);
};

export { createUser, getUser, getUsers, loginUser, deleteUser };
