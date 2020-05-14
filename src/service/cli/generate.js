'use strict';

const fs = require(`fs`).promises;
const {shuffle, getRandomInt, logger} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_TITLES_PATH,
  OFFER_TYPES,
  pictureSettings,
  SumRestrict,
  ExitCode
} = require(`../../constants`);

const getCategories = (data) => [...new Set(
    Array(getRandomInt(0, data.length - 1)).fill({}).map(
        () => data[getRandomInt(0, data.length - 1)]
    )
)];

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf-8`);

    return content.split(`\n`);
  } catch (err) {
    logger.error(err);

    return [];
  }
};

const getOffers = (count = DEFAULT_COUNT, titles, categories, sentences) => (
  JSON.stringify(
      Array(count)
        .fill({})
        .map(() => ({
          title: titles[getRandomInt(0, titles.length - 1)],
          picture: `item${getRandomInt(pictureSettings.min, pictureSettings.max)}.jpg`,
          description: shuffle(sentences).slice(1, 5).join(` `),
          type: OFFER_TYPES[getRandomInt()],
          sum: getRandomInt(SumRestrict.min, SumRestrict.max),
          category: getCategories(categories)
        }))
  )
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);

    const countOffers = Number.parseInt(count, 10);
    const content = getOffers(countOffers, titles, categories, sentences);

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.success(`Operation success. File created.`);

      return ExitCode.success;
    } catch (err) {
      logger.error(err);

      return ExitCode.error;
    }
  }
};
