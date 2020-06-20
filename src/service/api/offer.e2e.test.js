'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);
const offerStubs = require(`../../../testStuff/offers-stubs`);
const {HttpCode} = require(`../../constants`);

let server;
const offerStub = {
  "id": `1`,
  "comments": [
    {
      "id": `commentId`,
      "text": `comment-text`
    }
  ],
  "title": `title`,
  "picture": `picture`,
  "description": `description`,
  "type": `type`,
  "sum": 500,
  "category": [
    `category`,
  ]
};

beforeAll(async () => {
  server = await createApp(offerStubs);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe(`Offers API end-points`, () => {
  test(`Should return status ${HttpCode.OK} and array of offers on GET request`, async () => {
    const res = await request(server).get((`/api/offers`));

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toHaveProperty(`length`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Should return status ${HttpCode.NOT_FOUND} for wrong request`, async () => {
    const res = await request(server).get(`/api/offers/wrongId`);

    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.body).toEqual({});
  });

  test(`Should return status ${HttpCode.CREATED} for create offer request`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send(offerStub);

    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Should return status ${HttpCode.BAD_REQUEST} for create offer bad request`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send({});

    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });

  test(`Should return status ${HttpCode.OK} for delete offer request`, async () => {
    const res = await request(server).delete(`/api/offers/offerId-3`);

    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Should return status ${HttpCode.NOT_FOUND} for delete offer request with wrong ID`, async () => {
    const res = await request(server).delete(`/api/offers/wrongId`);

    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`Should return status ${HttpCode.OK} for put request`, async () => {
    const res = await request(server)
      .put(`/api/offers/offerId-1`)
      .send({
        "id": `offerId-1`,
        "comments": [
          {
            "id": `commentId`,
            "text": `comment-text`
          }
        ],
        "title": `title`,
        "picture": `picture`,
        "description": `description`,
        "type": `type`,
        "sum": 500,
        "category": [
          `category`,
        ]
      });
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Should return status ${HttpCode.BAD_REQUEST} for put request with wrong data`, async () => {
    const res = await request(server)
      .put(`/api/offers/offerId-1`)
      .send({
        "id": `offerId-1`,
        "title": `title`,
      });
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});

describe(`Offers comments API end-points`, () => {
  test(`Should return status ${HttpCode.OK} and array of comments on GET request`, async () => {
    const res = await request(server).get((`/api/offers/offerId-1/comments`));

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toHaveProperty(`length`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Should return status ${HttpCode.NOT_FOUND} for request of offer comments with wrong offer ID`, async () => {
    const res = await request(server).get((`/api/offers/wrongId/comments`));

    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.body).toEqual({});
  });

  test(`Should return status ${HttpCode.OK} for delete comment request`, async () => {
    const deleteRes = await request(server).delete((`/api/offers/offerId-1/comments/commentId-2`));
    const offersRes = await request(server).get((`/api/offers/offerId-1/comments`));

    expect(deleteRes.statusCode).toBe(HttpCode.OK);
    expect(offersRes.body.length).toBe(1);
  });

  test(`Should return status ${HttpCode.NOT_FOUND} for delete comment request`, async () => {
    const res = await request(server).delete((`/api/offers/offerId-1/comments/wrongId`));

    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`Should return status ${HttpCode.CREATED} and array of comments on POST request`, async () => {
    const res = await request(server)
      .post((`/api/offers/offerId-1/comments`))
      .send({
        "text": `comment-text-1`
      });

    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Should return status ${HttpCode.BAD_REQUEST} for empty comment on POST request`, async () => {
    const res = await request(server)
      .post((`/api/offers/offerId-1/comments`))
      .send({});

    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});
