"use strict";

const {HttpCode} = require(`../service/constants`);

const {Router} = require(`express`);
const searchRoute = new Router();
const {readMock} = require(`../middleware/readMock`);

searchRoute.use(`/`, readMock, (req, res) => {
  const mocks = req.mocks;
  const {query} = req.query;
  const searchResults = mocks.filter((article) => article.title === query);
  if (searchResults.length >= 1) {
    res.status(HttpCode.OK).json(searchResults);
  } else {
    res.status(HttpCode.OK).json([]);
  }
});

module.exports = searchRoute;
