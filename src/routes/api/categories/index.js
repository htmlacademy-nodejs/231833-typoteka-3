"use strict";

const {HttpCode} = require(`../../../service/constants`);
const {Router} = require(`express`);
const categoriesRoute = new Router();
const {readMock} = require(`../../../service/cli/readMock`);
const {getLogger} = require(`../../../service/logger`);
const logger = getLogger();

categoriesRoute.get(`/`, async (_req, res) => {
  const mocks = await readMock;
  const categories = [...new Set(mocks.map((article) => {
    return article.category;
  }))];
  logger.info(`End request with status code ${res.statusCode}`);
  res.status(HttpCode.OK).json(categories);
});

module.exports = categoriesRoute;
