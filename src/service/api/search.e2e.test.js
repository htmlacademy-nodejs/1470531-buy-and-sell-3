'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);

let server;

beforeAll(async () => {
  server = await createApp();
});

describe(`Search API end-points`, () => {
  test(`Should return status 200 on GET request`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=Продам`));

    expect(res.statusCode).toBe(200);
  });

  test(`Should return status 400 for empty request`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=`));

    expect(res.statusCode).toBe(400);
  });
});
