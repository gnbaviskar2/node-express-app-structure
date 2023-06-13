import serverInit from './server_init';
import listenServer from './server';
import { expressHttpObjType } from './interface';

const launchMethods = {
  begin: (): void => {
    const expressObj: expressHttpObjType = serverInit();
    listenServer(expressObj);
  },
};

launchMethods.begin();
