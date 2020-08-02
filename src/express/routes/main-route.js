'use strict';

const {Router} = require(`express`);
const DataService = require(`../data-service/data-service`);

const mainRoute = new Router();

mainRoute.get(`/`, async (req, res) => {
  const offers = await DataService.getAllOffers();

  res.render(`main`, {
    offers
  });
});

module.exports = mainRoute;
