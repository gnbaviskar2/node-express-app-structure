import { expressHttpObjType } from './interface';
import { serverConfigs } from './core/configs';
import logger from './core/logger';

const { PORT, HOSTNAME } = serverConfigs;

const serverMethods = {
  listenServer: (expressHttpObj: expressHttpObjType): void => {
    expressHttpObj.httpServer.listen(PORT, HOSTNAME);
    expressHttpObj.httpServer.on('listening', () => {
      logger.info(`ecomm app IS RUNNING ON PORT : ${PORT}`);
      logger.info(`Worker ${process.pid} started`);
    });
    expressHttpObj.httpServer.on('error', (e) => {
      logger.error(`COULD NOT START THE SERVER : ${e}`);
      process.exit(0);
    });
    expressHttpObj.httpServer.on('close', () => {
      logger.info('CLOSING THE SERVER ');
    });
  },
};

const listenServer = (expressHttpObj: expressHttpObjType): void => {
  serverMethods.listenServer(expressHttpObj);
};

export default listenServer;
