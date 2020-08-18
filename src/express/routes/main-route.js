'use strict';

const {Router} = require(`express`);
const OfferService = require(`../data-service/offer-service`);

const mainRoute = new Router();

mainRoute.get(`/`, async (req, res) => {
  const offers = await OfferService.getAllOffers();

  res.render(`main`, {
    offers
  });
});

module.exports = mainRoute;
