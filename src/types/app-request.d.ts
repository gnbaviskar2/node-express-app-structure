import { Request } from 'express';

declare interface ProtectedRequest extends Request {
  user?: User;
  accessToken?: string;
}

declare interface Tokens {
  accessToken: string;
}
