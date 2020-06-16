'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);

describe(`Categories`, () => {
  test(`category test`, async () => {
    const server = await createApp();
    const res = await request(server).get(`/api/category`);

    expect(res.statusCode).toBe(200);
  });
});
