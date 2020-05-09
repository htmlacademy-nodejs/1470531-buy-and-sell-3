'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {shuffle, getRandomInt} = require(`../../utils`);
const {
  CATEGORIES,
  DEFAULT_COUNT,
  DESCRIPTIONS,
  FILE_NAME,
  TITLES,
  OFFER_TYPES,
  pictureSettings,
  SumRestrict,
  ExitCode
} = require(`../../constants`);

const getCategories = () => [...new Set(
    Array(getRandomInt(0, CATEGORIES.length - 1)).fill({}).map(
        () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]
    )
)];

const getOffers = (count = DEFAULT_COUNT) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: `item${getRandomInt(pictureSettings.min, pictureSettings.max)}.jpg`,
    description: shuffle(DESCRIPTIONS).slice(1, 5).join(` `),
    type: OFFER_TYPES[getRandomInt()],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: getCategories()
  }))
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const countOffers = Number.parseInt(count, 10);
    const content = JSON.stringify(getOffers(countOffers));

    try {
      await fs.writeFile(`../../${FILE_NAME}`, content);
      console.info(chalk.green(`Operation success. File created.`));

      return process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`, err));

      return process.exit(ExitCode.error);
    }
  }
};
