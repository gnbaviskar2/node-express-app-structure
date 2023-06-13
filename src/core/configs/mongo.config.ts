export default {
  MONGO_HOSTNAME: process.env.MONGO_HOSTNAME
    ? process.env.MONGO_HOSTNAME
    : 'localhost',
};
