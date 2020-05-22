'use strict';

const express = require(`express`);
const path = require(`path`);
const {DEFAULT_FRONT_PORT} = require(`../constants`);

const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const mainRoute = require(`./routes/main-route`);
const registerRoutes = require(`./routes/register-routes`);
const loginRoutes = require(`./routes/login-routes`);
const searchRoutes = require(`./routes/search-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const app = express();

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoute);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/search`, searchRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(DEFAULT_FRONT_PORT);
