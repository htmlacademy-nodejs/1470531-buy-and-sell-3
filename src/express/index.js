'use strict';

const express = require(`express`);
const {DEFAULT_SERVER_PORT} = require(`../constants`);

const mainRoute = require(`./routes/main-route`);
const registerRoutes = require(`./routes/register-routes`);
const loginRoutes = require(`./routes/login-routes`);
const searchRoutes = require(`./routes/search-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const app = express();

app.use(`/`, mainRoute);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/search`, searchRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(DEFAULT_SERVER_PORT);