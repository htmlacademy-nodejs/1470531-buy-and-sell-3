'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);
const offerStubs = require(`../../../testStuff/offers-stubs`);
const {HttpCode} = require(`../../constants`);

let server;

beforeAll(async () => {
  server = await createApp(offerStubs);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe(`Categories API end-points`, () => {
  test(`Should return status ${HttpCode.OK} on GET request`, async () => {
    const res = await request(server).get(`/api/category`);

    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Should have at least one category`, async () => {
    const res = await request(server).get(`/api/category`);

    expect(res.body.length).toBeGreaterThan(0);
  });
});
