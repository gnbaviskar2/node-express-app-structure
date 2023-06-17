import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import base64 from 'base-64';
import asyncHandler from '../helpers/handlers/async.handler';
import { httpCodes } from '../core/constants';
import { userRepo } from '../repos';
import { userPayloadType } from '../interface';
import { userValidators } from '../helpers/validators';
import { responseHandlers } from '../helpers/handlers';
import { signJsonWebToken } from '../core/utils/auth.util';
import AppError, { HttpCodeEnum } from '../helpers/handlers/api.error.handler';

const createUser = asyncHandler(async (req: Request, res: Response) => {
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

  const isValidInput = userValidators.validateCreateUser(payload);
  if (isValidInput.error) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: isValidInput.error.message,
    });
  }

  // hash password
  payload.password = await bcrypt.hash(payload.password, 10);

  const userCreated = await userRepo.createUser(payload);
  if (!userCreated) {
    throw new AppError({
      httpCode: HttpCodeEnum.INTERNAL_SERVER_ERROR,
      description: 'Could not create user',
    });
  }
  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    responseHandlers.responseUserData(userCreated),
    'SignUp successful'
  );
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userRepo.getUser(req.params._id);
  if (user) {
    return responseHandlers.apiResponse(
      res,
      httpCodes.OK,
      responseHandlers.responseUserData(user),
      'User found'
    );
  }
  throw new AppError({
    httpCode: HttpCodeEnum.NOT_FOUND,
    description: 'No user found',
  });
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userRepo.getUsers();
  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    { users },
    'Users found'
  );
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userRepo.getUserByEmail(req.body.email);
  if (!user) {
    throw new AppError({
      httpCode: HttpCodeEnum.NOT_FOUND,
      description: 'No user found',
    });
  }
  //  decode password
  const password = base64.decode(req.body.password);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: 'Wrong username/ password',
    });
  }
  const token = await signJsonWebToken(user);

  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    { accessToken: token },
    'Logged In'
  );
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const delResult = await userRepo.deleteUser(req.params._id);
  if (delResult.deletedCount === 0) {
    throw new AppError({
      httpCode: HttpCodeEnum.BAD_REQUEST,
      description: 'Could not delete the user!',
    });
  }

  return responseHandlers.apiResponse(
    res,
    httpCodes.OK,
    { result: delResult },
    'User Deleted'
  );
});

export { createUser, getUser, getUsers, loginUser, deleteUser };
