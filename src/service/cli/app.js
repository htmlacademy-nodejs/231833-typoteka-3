"use strict";

const path = require(`path`);
const express = require(`express`);
const app = express();
const {getLogger} = require(`../logger`);
const logger = getLogger();

const articlesRoute = require(`../../routes/articles`);
const categoriesRoute = require(`../../routes/categories`);
const searchRoute = require(`../../routes/search`);

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

const pinoMiddleware = (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
};

app.use(express.json());
app.use(`/api/articles`, pinoMiddleware, articlesRoute);
app.use(`/api/categories`, pinoMiddleware, categoriesRoute);
app.use(`/search`, pinoMiddleware, searchRoute);
app.use(`/`, (req, res) => {
  logger.debug(`Start request to url ${req.url}, doesn't exist`);
  res.status(400).send(`Page not found`);
});

module.exports = app;
