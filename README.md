# HapiJS-JWT-mongodb-boilerplate #

HapiJS quickstart project boiler with integrated JWT authentication and mongodb.

### What is this repository for? ###

* Quick summary
* Version 1.0.0

### How do I get set up? ###

* Clone the repo to your local machine.
* Dependencies: nodejs v8.9.x+, npm v5.5.x+
* Open terminal run 'npm install'
* Create .env file with the required values. (See Creating .env file)
* TODO How to run tests
* TODO Deployment instructions

### Creating .env file ###

This project uses "dotenv" npm package to store and use enviroment variables.
Create a .env file in the root folder. Inside this file, the following variables must be declared:

* NODE_ENV   : 'production', 'development', 'test' or 'staging'.
* PORT       : port on which to run the API server.
* DB_DB      : Name of the database you want to connect to.
* DB_USER    : username with which to connect to the DB.
* DB_PASS    : password of the above given user.
* DB_HOST    : hostname of the server where the DB is located.
* DB_PORT    : port of the DB service.
* JWT_SECRET : The secret key with which to sign your JWT Tokens.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* pmdashboard@fissionlabs.com
* ishtiaque.zafar@fissionlabs.in
* Other community or team contact