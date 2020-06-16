'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);

let server;

beforeAll(async () => {
  server = await createApp();
});

describe(`Categories API end-points`, () => {
  test(`Should return status 200 on GET request`, async () => {
    const res = await request(server).get(`/api/category`);

    expect(res.statusCode).toBe(200);
  });

  test(`Should have at least one category`, async () => {
    const res = await request(server).get(`/api/category`);

    expect(res.body.length).toBeGreaterThan(0);
  });
});
