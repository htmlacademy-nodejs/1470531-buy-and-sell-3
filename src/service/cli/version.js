'use strict';

const chalk = require(`chalk`);

const packageJsonFile = require(`../../../package.json`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    return console.info(chalk.blue(version));
  }
};
