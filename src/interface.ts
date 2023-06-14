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

export { expressHttpObjType, productPayloadType };
