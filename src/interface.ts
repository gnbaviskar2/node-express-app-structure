import { Application } from 'express';
import { Server } from 'http';

type expressHttpObjType = {
  ecommApp: Application;
  httpServer: Server;
};

interface productPayloadType {
  _id?: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: string;
}

interface cartPayload {
  productId: string;
  quantity: number;
}

interface userPayloadType {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  cart: [cartPayload?];
  createdAt?: string;
}

interface jwtPayload {
  email: string;
  exp: number;
  iat: number;
  user_id: string;
}

export { expressHttpObjType, productPayloadType, userPayloadType, jwtPayload };
