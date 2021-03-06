'use strict';

const API_PREFIX = `/api`;
const API_URL = `http://localhost:3000/api`;

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_NAMES_PATH = `./data/names.txt`;
const FILE_SURNAMES_PATH = `./data/surnames.txt`;

const OFFER_TYPES = [`куплю`, `продам`];

const MAX_ID_LENGTH = 6;

const MAX_COMMENTS = 4;

const pictureSettings = {
  min: 1,
  max: 16,
};

const avatarSettings = {
  min: 1,
  max: 4,
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

const TimeInMilliseconds = {
  second: 1000,
  minute: 1000 * 60
};

const Message = {
  notFound: `Sorry, page not found`,
  fileCreated: `Operation success. File created.`,
  listenOnPort: (port) => `Listening for connections on http://localhost:${port}`,
  serverStartError: (port, error) => `Server can't start on http://localhost:${port} with error: ${error}`
};

const DEFAULT_API_PORT = 3000;

const DEFAULT_FRONT_PORT = 8080;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  API_PREFIX,
  API_URL,
  avatarSettings,
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_NAMES_PATH,
  FILE_SURNAMES_PATH,
  MAX_COMMENTS,
  MAX_ID_LENGTH,
  OFFER_TYPES,
  pictureSettings,
  SumRestrict,
  TimeInMilliseconds,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  DEFAULT_API_PORT,
  DEFAULT_FRONT_PORT,
  HttpCode,
  Message
};
