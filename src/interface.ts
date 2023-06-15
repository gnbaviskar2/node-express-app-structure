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

export { expressHttpObjType, productPayloadType, userPayloadType };
