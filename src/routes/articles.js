"use strict";

const {HttpCode} = require(`../service/constants`);
const {Router} = require(`express`);
const articlesRoute = new Router();
const {readMock} = require(`../middleware/readMock`);

articlesRoute.get(`/`, readMock, (req, res) => {
  const mocks = req.mocks;
  res.status(HttpCode.OK).json(mocks);
});

articlesRoute.get(`/:articleId`, readMock, (req, res) => {
  const mocks = req.mocks;
  const articleId = req.params.articleId;
  const article = mocks.find((item) => item.id === articleId);
  res.status(HttpCode.OK).json(article);
});

articlesRoute.post(`/`, readMock, (req, res) => {
  const {title, announce, fullText, category, img} = req.body;
  if (title && announce && category) {
    const newArticle = ({
      title,
      announce,
      fullText: fullText || `not set`,
      category,
      img: img || `not set`,
      createdDate: new Date()
    });
    res.status(HttpCode.OK).json(newArticle);
  } else {
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
  }
});

articlesRoute.put(`/:articleId`, readMock, (req, res) => {
  const mocks = req.mocks;
  const articleId = req.params.articleId;
  const article = mocks.find((item) => item.id === articleId);

  const {title, announce, fullText, category, img} = req.body;

  if (title && announce && category) {
    article.title = title;
    article.announce = announce;
    article.category = category;
    if (fullText) {
      article.fullText = fullText;
    }
    if (img) {
      article.img = img;
    }
    res.status(HttpCode.OK).json(article);
  } else {
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
  }
});

articlesRoute.delete(`/:articleId`, readMock, (req, res) => {
  const articleId = req.params.articleId;
  const mocks = req.mocks;
  const articles = mocks.filter((item) => item.id !== articleId);
  res.status(HttpCode.OK).json(articles);
});

articlesRoute.get(`/:articleId/comments`, readMock, (req, res) => {
  const mocks = req.mocks;
  const articleId = req.params.articleId;
  const article = mocks.find((item) => item.id === articleId);
  const comments = article.comments;
  res.status(HttpCode.OK).json(comments);
});

articlesRoute.delete(`/:articleId/comments/:commentId`, readMock, (req, res) => {
  const mocks = req.mocks;
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  const article = mocks.find((item) => item.id === articleId);
  const comments = article.comments.filter((c) => {
    return c.id !== commentId;
  });
  res.status(HttpCode.OK).json(comments);
});

articlesRoute.post(`/:articleId/comments`, readMock, (req, res) => {
  const mocks = req.mocks;
  const articleId = req.params.articleId;
  const {text} = req.body;
  if (text) {
    const article = mocks.find((item) => item.id === articleId);
    article.comments.push({text});
    res.status(HttpCode.OK).json(article);
  } else {
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
  }
});

module.exports = articlesRoute;
