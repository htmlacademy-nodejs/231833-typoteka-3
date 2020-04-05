"use strict";

const {HttpCode} = require(`../service/constants`);
const {Router} = require(`express`);
const categoriesRoute = new Router();
const {readMock} = require(`../middleware/readMock`);

categoriesRoute.get(`/`, readMock, (req, res) => {
  const mocks = req.mocks;
  const categories = [];
  for (let article of mocks) {
    categories.push(article.category);
  }
  const setCategories = [...new Set(categories)];
  res.status(HttpCode.OK).json(setCategories);
});

module.exports = categoriesRoute;
