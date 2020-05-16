'use strict';

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const OFFER_TYPES = [`offer`, `sale`];

const pictureSettings = {
  min: 1,
  max: 16,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const USER_ARGV_INDEX = 2;

const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  success: 0,
  error: 1
};

const Message = {
  notFound: `Sorry, page not found`,
  listenOnPort: (port) => `Listening for connections on http://localhost:${port}`
};

const DEFAULT_PORT = 3000;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  OFFER_TYPES,
  pictureSettings,
  SumRestrict,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  DEFAULT_PORT,
  HttpCode,
  Message
};
