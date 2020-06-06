'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {shuffle, getRandomInt, logger} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_TITLES_PATH,
  FILE_COMMENTS_PATH,
  MAX_COMMENTS,
  MAX_ID_LENGTH,
  OFFER_TYPES,
  pictureSettings,
  SumRestrict,
  ExitCode,
  Message
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

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const getOffers = (count = DEFAULT_COUNT, titles, categories, sentences, comments) => (
  JSON.stringify(
      Array(count)
        .fill({})
        .map(() => ({
          id: nanoid(MAX_ID_LENGTH),
          comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
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
    const comments = await readContent(FILE_COMMENTS_PATH);

    const countOffers = Number.parseInt(count, 10);
    const content = getOffers(countOffers, titles, categories, sentences, comments);

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.success(Message.fileCreated);

      return ExitCode.success;
    } catch (err) {
      logger.error(err);

      return ExitCode.error;
    }
  }
};
