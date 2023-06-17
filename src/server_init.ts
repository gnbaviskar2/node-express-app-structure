import express, { Application } from 'express';
import { Server, createServer } from 'http';
import mongoConnection from './helpers/middlewares/mongo';
import { expressHttpObjType } from './interface';
import v1 from './routes/v1';
import errorMiddleware from './helpers/middlewares/error.middleware';

const middlewareMethods = {
  initJsonBodyParser: (ecommApp: Application) => ecommApp.use(express.json()),

  initMongoConnection: async () => {
    await mongoConnection();
  },

  initRoutes: (ecommApp: Application) => {
    ecommApp.use('/v1', v1);
  },

  initErrorFormatMiddleware: (ecommApp: Application) => {
    ecommApp.use(errorMiddleware);
  },
};

const serverInit = (): expressHttpObjType => {
  const ecommApp = express();
  const httpServer: Server = createServer(ecommApp);

  // body parser middleware initialization
  middlewareMethods.initJsonBodyParser(ecommApp);

  // mongo connection
  middlewareMethods.initMongoConnection();

  // initiate routes
  middlewareMethods.initRoutes(ecommApp);

  // error formatter middleware
  middlewareMethods.initErrorFormatMiddleware(ecommApp);

  return {
    ecommApp,
    httpServer,
  };
};

export default serverInit;
