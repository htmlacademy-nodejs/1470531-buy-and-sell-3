'use strict';

const {ExitCode} = require(`../../constants`);
const {logger} = require(`../../utils`);

const packageJsonFile = require(`../../../package.json`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    logger.info(version);

    return ExitCode.success;
  }
};
