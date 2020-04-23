"use strict";

const {Router} = require(`express`);
const myRouter = new Router();
const axios = require(`axios`);
const {HttpCode} = require(`../../service/constants`);

myRouter.get(`/`, async (req, res) => {
  try {
    const articles = await axios.get(`http://127.0.0.1:3000/api/articles`);
    const data = articles.data;
    res.render(`admin/my`, {data: data || []});
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

myRouter.get(`/comments`, async (req, res) => {
  try {
    const articles = await axios.get(`http://127.0.0.1:3000/api/articles`);
    const threeArticlesId = articles.data.map((item) => item.id).slice(0, 3);
    const comments = await threeArticlesId.map(async (item) => await axios.get(`http://127.0.0.1:3000/api/articles/${item}/comments`));
    Promise.all(comments).then((values) => {
      const commentsArray = values.map((value) => [...value.data]).flat().map((item) => item.text);
      res.status(HttpCode.OK).render(`admin/comments`, {data: commentsArray || []});
    });
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

module.exports = myRouter;
