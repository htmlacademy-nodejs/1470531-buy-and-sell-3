'use strict';

const {Router} = require(`express`);
const OfferService = require(`../data-service/offer-service`);

const searchRoutes = new Router();

searchRoutes.get(`/`, async (req, res) => {
  const offers = await OfferService.getSearchResults(req.originalUrl);

  return res.render(`search-result`, {
    offers,
  });
});

module.exports = searchRoutes;
