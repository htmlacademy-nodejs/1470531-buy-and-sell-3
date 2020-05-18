'use strict';

const {Router} = require(`express`);

const offersRoutes = new Router();

offersRoutes.get(`/`, (req, res) => res.send(`/offers`));
offersRoutes.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRoutes.get(`/:id`, (req, res) => res.send(`/offers/:id`));
offersRoutes.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`));
offersRoutes.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id`));

module.exports = offersRoutes;

