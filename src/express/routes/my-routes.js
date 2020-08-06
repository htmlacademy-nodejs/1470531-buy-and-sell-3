'use strict';

const {Router} = require(`express`);
const DataService = require(`../data-service/data-service`);

const registerRoutes = new Router();

registerRoutes.get(`/`, async (req, res) => {
  const offers = await DataService.getAllOffers();

  res.render(`my/my-tickets`, {
    offers
  });
});

registerRoutes.get(`/comments`, async (req, res) => {
  const offers = await DataService.getLastThreeOffersWithComments();

  res.render(`my/comments`, {
    offers
  });
});

module.exports = registerRoutes;
