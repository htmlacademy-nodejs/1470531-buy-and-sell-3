'use strict';

const chalk = require(`chalk`);

const getRandomInt = (min = 0, max = 1) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

const getLeadingZero = (num, maxNumWithoutZero = 10) => num < maxNumWithoutZero ? `0` + num : num;

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const logger = {
  info: (message) => console.info(chalk.blue(message)),
  data: (message) => console.info(chalk.gray(message)),
  success: (message) => console.info(chalk.green(message)),
  error: (message) => console.error(chalk.red(message)),
};

module.exports = {
  getRandomInt,
  getLeadingZero,
  shuffle,
  logger
};
