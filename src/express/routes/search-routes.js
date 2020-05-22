'use strict';

const {Router} = require(`express`);

const searchRoutes = new Router();

searchRoutes.get(`/`, (req, res) => res.render(`search-result`));

module.exports = searchRoutes;
