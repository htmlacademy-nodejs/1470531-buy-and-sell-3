'use strict';

const {Router} = require(`express`);

const offersRoutes = new Router();

offersRoutes.get(`/add`, (req, res) => res.render(`offers/new-ticket`));
offersRoutes.get(`/:id`, (req, res) => res.render(`offers/ticket`));
offersRoutes.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRoutes.get(`/edit/:id`, (req, res) => res.render(`offers/ticket-edit`));

module.exports = offersRoutes;

