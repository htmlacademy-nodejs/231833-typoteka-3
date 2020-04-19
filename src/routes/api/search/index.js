"use strict";

const {HttpCode} = require(`../../../service/constants`);

const {Router} = require(`express`);
const searchRoute = new Router();
const {readMock} = require(`../../../service/cli/readMock`);
const {getLogger} = require(`../../../service/logger`);
const logger = getLogger();

searchRoute.get(`/`, async (req, res) => {
  const mocks = await readMock;
  const {query} = req.query;
  const searchResults = mocks.filter((article) => article.title.toLowerCase().includes(query.toLowerCase()));
  if (searchResults.length >= 1) {
    logger.info(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.OK).json(searchResults);
  } else {
    logger.info(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.OK).json([]);
  }
});

module.exports = searchRoute;
