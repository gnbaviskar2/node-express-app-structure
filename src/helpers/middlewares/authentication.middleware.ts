import { Response, NextFunction } from 'express';
import asyncHandler from '../handlers/async.handler';
import { ProtectedRequest } from '../../types/app-request';
import {
  getAccessToken,
  verifyToken,
  validateToken,
} from '../../core/utils/auth.util';
import { jwtPayload } from '../../interface';
import { userRepo } from '../../repos';
import { userErrorConstants } from '../../core/constants';
import AppError, { HttpCodeEnum } from '../handlers/api.error.handler';

const authentication = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const authorization = getAccessToken(req.headers.authorization);
    const decoded = verifyToken(authorization) as jwtPayload;
    validateToken(decoded);
    const user = await userRepo.getUser(decoded.user_id);
    if (!user) {
      throw new AppError({
        httpCode: HttpCodeEnum.BAD_REQUEST,
        description: userErrorConstants.invalidUser,
      });
    }
    req.user = user;
    return next();
  }
);

export default authentication;
