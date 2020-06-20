'use strict';

const express = require(`express`);
const {logger} = require(`../../utils`);
const {
  DEFAULT_API_PORT,
  HttpCode,
  Message,
  API_PREFIX
} = require(`../../constants`);
const createApi = require(`../api`);
const getMockData = require(`../lib/get-mock-data`);

const createApp = async (data) => {
  const app = express();
  const apiRoutes = await createApi(data);

  app.use(express.json());
  app.use(API_PREFIX, apiRoutes);
  app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`));

  return app;
};

const run = async (args) => {
  const port = Number.parseInt(args, 10) || DEFAULT_API_PORT;
  const mockData = await getMockData();
  const app = await createApp(mockData);

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
