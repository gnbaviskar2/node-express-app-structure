import express, { Application } from 'express';
import { Server, createServer } from 'http';

import { expressHttpObjType } from './interface';

const middlewareMethods = {
  initJsonBodyParser: (ecommApp: Application) => ecommApp.use(express.json()),
};

const serverInit = (): expressHttpObjType => {
  const ecommApp = express();
  const httpServer: Server = createServer(ecommApp);

  // body parser middleware initialization
  middlewareMethods.initJsonBodyParser(ecommApp);

  return {
    ecommApp,
    httpServer,
  };
};

export default serverInit;
