'use strict';

const {Router} = require(`express`);

const registerRoutes = new Router();

registerRoutes.get(`/`, (req, res) => res.render(`my/my-tickets`));
registerRoutes.get(`/comments`, (req, res) => res.render(`my/comments`));

module.exports = registerRoutes;
