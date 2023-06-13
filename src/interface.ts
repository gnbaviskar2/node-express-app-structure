import { Application } from 'express';
import { Server } from 'http';

type expressHttpObjType = {
  ecommApp: Application;
  httpServer: Server;
};

export { expressHttpObjType };
