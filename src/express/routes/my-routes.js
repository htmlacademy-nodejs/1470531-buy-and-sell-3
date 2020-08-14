'use strict';

const {Router} = require(`express`);
const OfferService = require(`../data-service/offer-service`);

const registerRoutes = new Router();

registerRoutes.get(`/`, async (req, res) => {
  const offers = await OfferService.getAllOffers();

  res.render(`my/my-tickets`, {
    offers
  });
});

registerRoutes.get(`/comments`, async (req, res) => {
  const offers = await OfferService.getLastOffersWithComments();

  res.render(`my/comments`, {
    offers
  });
});

module.exports = registerRoutes;
