"use strict";

const express = require(`express`);
const loginRoutes = require(`../routes/login`);
const mainRoutes = require(`../routes/main`);
const myRoutes = require(`../routes/my`);
const offersRoutes = require(`../routes/offers`);
const registerRoutes = require(`../routes/register`);
const searchRoutes = require(`../routes/search`);

const app = express();
const DEFAULT_PORT = 8080;


app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/register`, registerRoutes);
app.use(`/search`, searchRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Server is running on port ${DEFAULT_PORT}`));
