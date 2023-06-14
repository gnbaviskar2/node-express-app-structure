const mongoose = require('mongoose');

// this does not word. we need to have call mongoose.connect once at least, check mongoose.test.js
const conn1 = mongoose.createConnection(
  'mongodb://root:root@127.0.0.1:27017/lol1?authSource=admin'
);

const conn2 = mongoose.createConnection(
  'mongodb://root:root@127.0.0.1:27017/lol2?authSource=admin'
);

mongoose.connect();

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
