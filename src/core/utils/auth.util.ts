import jwt, { verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { UserModelType } from '../../model/user.model';
import { jwtPayload } from '../../interface';

const privateKey = fs.readFileSync(
  path.join(__dirname, '../../../keys', 'rsa.key'),
  'utf8'
);
const publicKey = fs.readFileSync(
  path.join(__dirname, '../../../keys', 'rsa.key.pub'),
  'utf8'
);

const signJsonWebToken = async (user: UserModelType) => {
  try {
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
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

const getAccessToken = (authorization?: string): string => {
  if (!authorization) {
    throw new Error('Invalid Authorization');
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new Error('Invalid Authorization');
  }
  return authorization.split(' ')[1];
};

const verifyToken = (authorization: string) => {
  try {
    return verify(authorization, publicKey);
  } catch (e) {
    console.log(e);
    return e;
  }
};

const validateToken = (token?: jwtPayload) => {
  if (!token || !token.email || !token.exp || !token.iat || !token.user_id) {
    throw new Error('wrong token found');
  }
  return true;
};

export { signJsonWebToken, getAccessToken, verifyToken, validateToken };
