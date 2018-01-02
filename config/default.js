module.exports = {
  server: {
    host: 'localhost',
    port: process.env.PORT,
    maxBytes: 104857600,
  },
  JWTConfig: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    uri: 'mongodb://localhost:27017/hapi-test', // read from env,
    opts: {
      useMongoClient: true,
      config: {
        autoIndex: true,
      },
    },
  },
};
