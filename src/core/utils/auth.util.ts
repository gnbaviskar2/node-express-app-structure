import jwt, { verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { UserModelType } from '../../model/user.model';
import { jwtPayload } from '../../interface';
import AppError, {
  HttpCodeEnum,
} from '../../helpers/handlers/api.error.handler';

const privateKey = fs.readFileSync(
  path.join(__dirname, '../../../keys', 'rsa.key'),
  'utf8'
);
const publicKey = fs.readFileSync(
  path.join(__dirname, '../../../keys', 'rsa.key.pub'),
  'utf8'
);

const signJsonWebToken = async (user: UserModelType) => {
  const token = jwt.sign(
    {
      user_id: user._id,
      email: user.email,
    },
    privateKey,
    {
      expiresIn: '12d',
      algorithm: 'RS256',
      // allowInsecureKeySizes: true,
    }
  );
  return token;
};

const getAccessToken = (authorization?: string): string => {
  if (!authorization) {
    throw new AppError({
      httpCode: HttpCodeEnum.UNAUTHORIZED,
      description: 'Token not provided',
    });
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new AppError({
      httpCode: HttpCodeEnum.UNAUTHORIZED,
      description: 'Invalid authorization',
    });
  }
  return authorization.split(' ')[1];
};

const verifyToken = (authorization: string) => {
  return verify(authorization, publicKey);
};

const validateToken = (token?: jwtPayload) => {
  if (!token || !token.email || !token.exp || !token.iat || !token.user_id) {
    throw new AppError({
      httpCode: HttpCodeEnum.UNAUTHORIZED,
      description: 'Invalid authorization',
    });
  }
  return true;
};

export { signJsonWebToken, getAccessToken, verifyToken, validateToken };
