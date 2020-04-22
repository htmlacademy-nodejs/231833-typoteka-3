"use strict";

const express = require(`express`);
const app = express();
const {getLogger} = require(`../logger`);
const logger = getLogger();

const articlesRouteAPI = require(`../../routes/api/articles`);
const categoriesRouteAPI = require(`../../routes/api/categories`);
const searchRouteAPI = require(`../../routes/api/search`);

const pinoMiddleware = (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
};

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(`/api/articles`, pinoMiddleware, articlesRouteAPI);
app.use(`/api/categories`, pinoMiddleware, categoriesRouteAPI);
app.use(`/api/search`, pinoMiddleware, searchRouteAPI);
app.use(`/`, (req, res) => {
  logger.debug(`Start request to url ${req.url}, doesn't exist`);
  res.status(400).send(`Page not found`);
});

module.exports = app;
