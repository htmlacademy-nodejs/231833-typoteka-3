"use strict";

const {HttpCode} = require(`../../service/constants`);

const {Router} = require(`express`);
const searchRoute = new Router();
const {readMock} = require(`../../service/cli/readMock`);

searchRoute.use(`/`, async (req, res) => {
  const mocks = await readMock;
  const {query} = req.query;
  const searchResults = mocks.filter((article) => article.title.includes(query));
  if (searchResults.length >= 1) {
    res.status(HttpCode.OK).json(searchResults);
  } else {
    res.status(HttpCode.OK).json([]);
  }
});

module.exports = searchRoute;
