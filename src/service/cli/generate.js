'use strict';

const fs = require(`fs`);
const {shuffle, getRandomInt} = require(`../../utils`);
const {
  CATEGORIES,
  DEFAULT_COUNT,
  DESCRIPTIONS,
  FILE_NAME,
  TITLES,
  OFFER_TYPES,
  pictureSettings,
  SumRestrict
} = require(`../../constatnts`);

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

const generateOffers = (count) => {
  const countOffers = Number.parseInt(count, 10);
  const content = JSON.stringify(getOffers(countOffers));

  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    generateOffers(args);
  }
};
