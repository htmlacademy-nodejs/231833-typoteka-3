"use strict";

const {Router} = require(`express`);
const mainRouter = new Router();
const axios = require(`axios`);
const {HttpCode} = require(`../../service/constants`);

mainRouter.get(`/`, async (req, res) => {
  try {
    const articles = await axios.get(`http://127.0.0.1:3000/api/articles`);
    const data = articles.data;
    res.render(`main`, {data: data || []});
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

module.exports = mainRouter;
