import mongoose from 'mongoose';
import logger from '../../../core/logger';
import { mongoConfigs } from '../../../core/configs';

const MONGO_URI = `mongodb://${mongoConfigs.MONGO_INITDB_ROOT_USERNAME}:${mongoConfigs.MONGO_INITDB_ROOT_PASSWORD}@${mongoConfigs.MONGO_INITDB_ROOT_HOST}:${mongoConfigs.MONGO_INITDB_ROOT_PORT}/?authSource=admin`;

const mongoMiddlewares = {
  connectionWithPromise: () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(MONGO_URI, {
          maxPoolSize: 50,
          minPoolSize: 5,
          dbName: mongoConfigs.MONGO_INITDB_ROOT_DB1,
        })
        .then(() => {
          resolve('CONNECTED TO MONGO');
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

const connectToMongo = async () => {
  try {
    await mongoMiddlewares.connectionWithPromise();
    logger.info('MONGO CONNECTION SUCCESSFUL');
  } catch (e) {
    connectToMongo();
    logger.error('MONGO CONNECTION FAILED: RETRYING TO CONNECT');
  }
};

mongoose.connection.on('error', () => {
  logger.info('RETRYING TO CONNECT TO MONGO');
});

mongoose.connection.on('open', () => {
  logger.info(`Mongoose DEFAULT CONNECTION OPEN TO ${MONGO_URI}`);
});

export default connectToMongo;
