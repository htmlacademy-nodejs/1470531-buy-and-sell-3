'use strict';

const fs = require(`fs`);
const pinoms = require(`pino-multi-stream`);

const prettyStream = pinoms.prettyStream({
  prettyPrint: {
    colorize: true,
    translateTime: `SYS:standard`,
    ignore: `hostname,pid`
  },
  prettifier: require(`pino-pretty`)
});
const streams = [
  {stream: fs.createWriteStream(`./src/service/logs/logs.txt`)},
  {stream: prettyStream}
];


const logger = pinoms({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `debug`,
}, pinoms.multistream(streams));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
