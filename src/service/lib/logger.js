'use strict';

const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `debug`
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
