// Importing the core modules ------------------- //
require('dotenv').config();
const Hapi = require('hapi');
const config = require('config');
const routes = require('hapi-auto-routes');
const mongoose = require('mongoose');
const mongoload = require('mongoload');
const Pack = require('./package');
// const _ = require('lodash');
// const Path = require('path');
// const Boom = require('boom');

const hapiauthjwt = require('hapi-auth-jwt2');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const handlebars = require('handlebars');
const good = require('good');
const goodConsole = require('good-console');
const goodFile = require('good-file');

// Setting up Server ---------------------------- //
const server = new Hapi.Server();
server.connection({
  host: config.server.host,
  port: config.server.port,
  routes: {
    cors: true,
  },
});

// CONNECT TO DB ------------------------------- //
mongoose.connect(config.database.uri, config.database.opts);

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const db = mongoose.connection;

mongoload.bind(mongoose).load({
  pattern: `${__dirname}/models/*.js`,
});

db.on('error', () => {
  console.error('Connection to db failed!');
  process.exit(0);
});

db.on('connected', () => {
  // On successfull connection, log connection details
  console.info(`MongoDB::Connected at ${config.database.uri}`);
  // start the server
  // eslint-disable-next-line
  startServer();
});

db.on('disconnected', (err) => {
  console.error('Connection terminated to db', err);
  process.exit(0);
});

// HELPER FUNCTIONS ----------------------------- //
function startServer() {
  const requiredHapiPlugins = [
    hapiauthjwt,
    inert,
    vision,
    {
      register: hapiSwagger,
      options: {
        info: {
          title: 'API Documentation',
          contact: {
            name: 'Fission Team',
            email: 'pmdashboard@fissionlabs.com',
          },
          version: Pack.version,
        },
      },
    },
    {
      register: good,
      options: {
        reporters: [{
          reporter: goodConsole,
          config: {
            format: 'MMMM Do YYYY h:mm:ss a',
            utc: false,
            color: true,
          },
          events: {
            response: '*',
            request: '*',
            log: '*',
            error: '*',
            info: '*',
            db: '*',
          },
        }, {
          reporter: goodFile,
          events: {
            response: '*',
            request: '*',
            log: '*',
            error: '*',
            ops: '*',
            db: '*',
          },
          config: {
            path: `${__dirname}/logs`,
            rotate: 'daily',
          },
        }],
      },
    },
  ];

  function jwtValidate(decoded, request, callback) {
    const User = mongoose.model('user');
    // eslint-disable-next-line
    User.findById(decoded._id, (err, user) => {
      if (err) {
        return callback(null, false);
      }
      if (user && user.isEnabled) {
        return callback(null, true);
      }
      return callback(null, false);
    });
  }

  server.register(requiredHapiPlugins, (err) => {
    if (err) {
      console.error('Error in registering one or more plugins.');
      // throw err;
      process.exit(0);
    } else {
      server.auth.strategy('jwt', 'jwt', {
        key: config.JWTConfig.secret,
        validateFunc: jwtValidate,
        verifyOptions: { algorithms: ['HS256'] },
      });

      server.views({
        engines: {
          html: handlebars,
        },
        relativeTo: __dirname,
        path: 'static',
      });

      server.route({
        method: 'GET',
        path: '/{filename*}',
        handler: {
          directory: {
            path: `${__dirname}/static`,
            listing: false,
            index: false,
          },
        },
      });

      routes.bind(server).register({
        pattern: `${__dirname}/routes/**/*.js`,
      });

      server.start(() => {
        console.info(`Server started at: ${server.info.uri}`);
      });
    }
  });
}

module.exports = server;
