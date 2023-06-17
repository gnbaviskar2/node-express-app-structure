import { Response, NextFunction } from 'express';
import { ProtectedRequest } from '../../types/app-request';
import {
  getAccessToken,
  verifyToken,
  validateToken,
} from '../../core/utils/auth.util';
import { jwtPayload } from '../../interface';
import { userRepo } from '../../repos';

const authentication = async (
  req: ProtectedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    console.log('get user auth');
    const authorization = getAccessToken(req.headers.authorization);
    const decoded = verifyToken(authorization) as jwtPayload;
    validateToken(decoded);
    const user = await userRepo.getUser(decoded.user_id);
    if (!user) {
      console.log('No valid user');
      throw new Error('No valid user');
    }
    req.user = user;
    return next();
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export default authentication;
