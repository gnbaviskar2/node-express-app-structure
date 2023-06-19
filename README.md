# Node Express App Backend Architecture

### Supports mongoDB, express server REST API

## Features

- Express: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- Typescript: TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. It is designed for the development of large applications and transpiles to JavaScript.
- Mongoose: Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box
- MongoDB: MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License which is deemed non-free by several distributions

## How to build and run:

- Clone the repo
- Install Postgres on local or install using Docker with following command:
  `>docker-compose -f docker-compose.yml up -d --build`
- Add following keys to .env
  ```
  PORT=7777
  LOG_DIR=/tmp/appLogs
  NODE_ENV=development
  MONGO_INITDB_ROOT_USERNAME=root
  MONGO_INITDB_ROOT_PASSWORD=root
  MONGO_INITDB_ROOT_HOST=127.0.0.1
  MONGO_INITDB_ROOT_PORT=27017
  MONGO_INITDB_ROOT_DB1=ecommDB
  ```
- Install dependencies
  ```
  yarn
  ```
- Run the server
  ```
  >npm run start
  ```

##### API documentation can be found here: https://documenter.getpostman.com/view/27555332/2s93sjToFV

To generate the RSA keys:
https://dev.to/tayfunakgc/jwt-with-rsa-signature-1jd
Producing RSA keys for token auth:

> ssh-keygen -t rsa -b 2048 -m PEM -f keys/rsa.key
