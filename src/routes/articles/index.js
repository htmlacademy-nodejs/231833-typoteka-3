"use strict";

const {Router} = require(`express`);
const articlesRouter = new Router();
const axios = require(`axios`);
const {HttpCode} = require(`../../service/constants`);

articlesRouter.get(`/edit/:articleId`, async (req, res) => {
  const articleId = req.params.articleId;
  if (articleId) {
    try {
      const article = await axios.get(`http://127.0.0.1:3000/api/articles/${articleId}`);
      res.status(HttpCode.OK).render(`admin/new-post`, {data: article.data});
    } catch (e) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
    }
  } else {
    res.status(HttpCode.NOT_FOUND).render(`errors/400`);
  }
  const articles = await axios.get(`http://127.0.0.1:3000/api/articles/${articleId}`);
  const data = articles.data;
  res.status(HttpCode.OK).json(data);
});

articlesRouter.get(`/add`, async (req, res) => {
  res.status(HttpCode.OK).render(`admin/new-post`);
});

articlesRouter.post(`/add`, async (req, res) => {
  const {title, announce, category} = req.body;
  let articles;
  if (title && announce) {
    try {
      articles = await axios.post(`http://127.0.0.1:3000/api/articles`, {
        title,
        category: `category`,
        announce
      });
      res.redirect(301, `/my`).render(`admin/my`, {data: articles.data});
      return;
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).render(`admin/new-post`, {data: {title, announce, category}});
      return;
    }
  } else {
    res.status(HttpCode.BAD_REQUEST).render(`admin/new-post`, {data: {title, announce, category}});
  }
});

module.exports = articlesRouter;
