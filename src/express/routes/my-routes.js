'use strict';

const {Router} = require(`express`);

const registerRoutes = new Router();

registerRoutes.get(`/`, (req, res) => res.send(`/my`));
registerRoutes.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = registerRoutes;
