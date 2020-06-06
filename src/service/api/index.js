'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const offer = require(`../api/offer`);
const search = require(`../api/search`);
const getMockData = require(`../lib/get-mock-data`);
const CategoryService = require(`../data-service/category`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const SearchService = require(`../data-service/search`);

const app = new Router();

const startApi = async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  offer(app, new OfferService(mockData), new CommentService());
};

startApi();

module.exports = app;


