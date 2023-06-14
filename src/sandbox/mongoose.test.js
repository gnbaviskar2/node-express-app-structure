// import mongoose, { connect } from 'mongoose';
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://root:root@127.0.0.1:27017/lol2?authSource=admin', {
    maxPoolSize: 100,
    minPoolSize: 10,
  })
  .then(() => {
    console.log(`connected to mongo: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.log(
      `error: could not connect to mongodb ${JSON.stringify(
        mongoose.connection.name
      )} : ${err}`
    );
  });

// we can many createConnection method, but mongoose.connect can be only one
const test2Conn = mongoose.createConnection(
  'mongodb://root:rosot@127.0.0.1:27017/lol?authSource=admin',
  {
    minPoolSize: 10,
  }
);
// data found with following
console.log(
  `lol ${JSON.stringify(test2Conn.useDb('lol3').collection('ii').find())}`
);
console.log('');

// seems like mongoose.on listens for first connection only
mongoose.connection.on('connected', () => {
  console.log(`connected 1 ${mongoose.connections[0].name}`);
  console.log(`connected 2 ${mongoose.connections[1].name}`);
});

mongoose.connection.on('error', () => {
  console.log(`error: ${mongoose.connection.name}`);
});

mongoose.connection.on('connecting', () => {
  console.log(`connecting to db ${mongoose.connections[0].name}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`dis connected ${mongoose.connection.name}`);
});
