'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const {logger} = require(`../../utils`);
const {
  FILE_NAME,
  DEFAULT_API_PORT,
  HttpCode,
  Message,
  API_PREFIX
} = require(`../../constants`);
const routes = require(`../api`);

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);

    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args, 10) || DEFAULT_API_PORT;

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
  }
};
