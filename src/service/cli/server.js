'use strict';

const express = require(`express`);
const {logger} = require(`../../utils`);
const {
  DEFAULT_API_PORT,
  HttpCode,
  Message,
  API_PREFIX
} = require(`../../constants`);
const routes = require(`../api`);

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(API_PREFIX, routes);
  app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`));

  return app;
};

const run = (args) => {
  const port = Number.parseInt(args, 10) || DEFAULT_API_PORT;
  const app = createApp();

  try {
    app.listen(DEFAULT_API_PORT, (err) => {
      if (err) {
        logger.error(Message.serverStartError(port, err));
      }

      return logger.success(Message.listenOnPort(port));
    });
  } catch (err) {
    logger.error(Message.serverStartError(port, err));
  }
};


module.exports = {
  name: `--server`,
  run,
  createApp
};
