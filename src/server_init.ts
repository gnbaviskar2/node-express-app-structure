import express, { Application } from 'express';
import { Server, createServer } from 'http';
import { mongoConnection } from './helpers/middlewares';

import { expressHttpObjType } from './interface';

const middlewareMethods = {
  initJsonBodyParser: (ecommApp: Application) => ecommApp.use(express.json()),

  initMongoConnection: async () => {
    await mongoConnection();
  },
};

const serverInit = (): expressHttpObjType => {
  const ecommApp = express();
  const httpServer: Server = createServer(ecommApp);

  // body parser middleware initialization
  middlewareMethods.initJsonBodyParser(ecommApp);

  // mongo connection
  middlewareMethods.initMongoConnection();

  return {
    ecommApp,
    httpServer,
  };
};

export default serverInit;
