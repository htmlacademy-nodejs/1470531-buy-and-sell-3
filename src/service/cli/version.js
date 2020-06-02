'use strict';

const {ExitCode} = require(`../../constants`);
const {messageLogger} = require(`../../utils`);

const packageJsonFile = require(`../../../package.json`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    messageLogger.info(version);

    return ExitCode.success;
  }
};
