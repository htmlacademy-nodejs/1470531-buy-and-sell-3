'use strict';

const {Router} = require(`express`);
const DataService = require(`../data-service/data-service`);

const searchRoutes = new Router();

searchRoutes.get(`/`, async (req, res) => {
  const offers = await DataService.getSearchResults(req.originalUrl);

  return res.render(`search-result`, {
    offers,
  });
});

module.exports = searchRoutes;
