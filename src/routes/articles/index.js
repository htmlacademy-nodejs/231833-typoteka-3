"use strict";

const {HttpCode} = require(`../../service/constants`);
const {Router} = require(`express`);
const articlesRoute = new Router();
const {readMock} = require(`../../service/cli/readMock`);
const {nanoid} = require(`nanoid/async`);
const {getLogger} = require(`../../service/logger`);
const logger = getLogger();

articlesRoute.get(`/`, async (req, res) => {
  const mocks = await readMock;
  logger.info(`End request with status code ${res.statusCode}`);
  res.status(HttpCode.OK).json(mocks);
});

articlesRoute.get(`/:articleId`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  const article = mocks.find((item) => item.id === articleId);
  if (article !== undefined) {
    logger.info(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.OK).json(article);
  } else {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.NOT_FOUND).send(`Article not found`);
  }
});

articlesRoute.post(`/`, async (req, res) => {
  const mocks = await readMock;
  const id = await nanoid();
  const {title, announce, fullText, category, img} = req.body;
  if (title && announce && category) {
    const newArticle = ({
      id,
      comments: [],
      title,
      createdDate: new Date(),
      announce,
      fullText: fullText || `not set`,
      category,
      img: img || `not set`
    });
    mocks.push(newArticle);
    logger.info(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.OK).json(mocks);
  } else {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
  }
});

articlesRoute.put(`/:articleId`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  const article = mocks.find((item) => item.id === articleId);

  if (article !== undefined) {
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
      logger.info(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.OK).json(article);
    } else {
      logger.error(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
    }
  } else {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.BAD_REQUEST).send(`Article not found`);
  }
});

articlesRoute.delete(`/:articleId`, async (req, res) => {
  const articleId = req.params.articleId;
  const mocks = await readMock;
  const articleIndex = mocks.findIndex((item) => item.id === articleId);
  if (articleIndex !== -1) {
    mocks.splice(articleIndex, 1);
    logger.info(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.OK).json(mocks);
  } else {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.NOT_FOUND).json(`Server error!`);
  }
});

articlesRoute.get(`/:articleId/comments`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  if (articleId === undefined) {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.BAD_REQUEST).json(`Incorrect parameters`);
    return;
  } else {
    const articleIndex = mocks.find((item) => item.id === articleId);
    if (articleIndex !== undefined) {
      const comments = articleIndex.comments;
      logger.info(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.OK).json(comments);
    } else {
      logger.error(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.BAD_REQUEST).json(`Incorrect article`);
    }
  }
});

articlesRoute.delete(`/:articleId/comments/:commentId`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  if (articleId !== undefined && commentId !== undefined) {
    const articleIndex = mocks.findIndex((item) => item.id === articleId);
    if (articleIndex !== -1) {
      const commentIndex = mocks[articleIndex].comments.findIndex((item) => item.id === commentId);
      if (commentIndex !== -1) {
        mocks[articleIndex].comments.splice(commentIndex, 1);
        logger.info(`End request with status code ${res.statusCode}`);
        res.status(HttpCode.OK).json(mocks);
        return;
      } else {
        logger.error(`End request with status code ${res.statusCode}`);
        res.status(HttpCode.NOT_FOUND).json(`Incorrect ids!`);
      }
    } else {
      logger.error(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.NOT_FOUND).json(`Incorrect ids!`);
    }
  } else {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.BAD_REQUEST).json(`Incorrect parameters!`);
  }
});

articlesRoute.post(`/:articleId/comments`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  const {text} = req.body;
  const id = await nanoid();
  if (text !== undefined && articleId !== undefined) {
    const comment = ({
      id,
      text
    });
    const articleIndex = mocks.findIndex((item) => item.id === articleId);
    if (articleIndex !== -1) {
      mocks[articleIndex].comments.push(comment);
      logger.info(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.OK).json(mocks);
    } else {
      logger.error(`End request with status code ${res.statusCode}`);
      res.status(HttpCode.BAD_REQUEST).json(`Incorrect article`);
    }
  } else {
    logger.error(`End request with status code ${res.statusCode}`);
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
  }
});

module.exports = articlesRoute;
