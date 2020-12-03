const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const server = express();

const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/actions', logger, actionsRouter);
server.use('/api/projects', logger, projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to Livy's Sprint Challenge!<h2>`)
})

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}}`
    );
    next();
  }

server.use(logger);

module.exports = server;
