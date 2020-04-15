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
  res.status(HttpCode.OK).json(mocks);
  logger.info(`End request with status code ${res.statusCode}`);
});

articlesRoute.get(`/:articleId`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  const article = mocks.find((item) => item.id === articleId);
  if (article !== undefined) {
    res.status(HttpCode.OK).json(article);
    logger.info(`End request with status code ${res.statusCode}`);
  } else {
    res.status(HttpCode.NOT_FOUND).send(`Article not found`);
    logger.error(`End request with status code ${res.statusCode}`);
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
    res.status(HttpCode.OK).json(mocks);
    logger.info(`End request with status code ${res.statusCode}`);
  } else {
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
    logger.error(`End request with status code ${res.statusCode}`);
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
      res.status(HttpCode.OK).json(article);
      logger.info(`End request with status code ${res.statusCode}`);
    } else {
      res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
      logger.error(`End request with status code ${res.statusCode}`);
    }
  } else {
    res.status(HttpCode.BAD_REQUEST).send(`Article not found`);
    logger.error(`End request with status code ${res.statusCode}`);
  }
});

articlesRoute.delete(`/:articleId`, async (req, res) => {
  const articleId = req.params.articleId;
  const mocks = await readMock;
  const articleIndex = mocks.findIndex((item) => item.id === articleId);
  if (articleIndex !== -1) {
    mocks.splice(articleIndex, 1);
    res.status(HttpCode.OK).json(mocks);
    logger.info(`End request with status code ${res.statusCode}`);
  } else {
    res.status(HttpCode.NOT_FOUND).json(`Server error!`);
    logger.error(`End request with status code ${res.statusCode}`);
  }
});

articlesRoute.get(`/:articleId/comments`, async (req, res) => {
  const mocks = await readMock;
  const articleId = req.params.articleId;
  if (articleId === undefined) {
    res.status(HttpCode.BAD_REQUEST).json(`Incorrect parameters`);
    logger.error(`End request with status code ${res.statusCode}`);
    return;
  } else {
    const articleIndex = mocks.find((item) => item.id === articleId);
    if (articleIndex !== undefined) {
      const comments = articleIndex.comments;
      res.status(HttpCode.OK).json(comments);
      logger.info(`End request with status code ${res.statusCode}`);
    } else {
      res.status(HttpCode.BAD_REQUEST).json(`Incorrect article`);
      logger.error(`End request with status code ${res.statusCode}`);
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
        res.status(HttpCode.OK).json(mocks);
        logger.info(`End request with status code ${res.statusCode}`);
        return;
      } else {
        res.status(HttpCode.NOT_FOUND).json(`Incorrect ids!`);
        logger.error(`End request with status code ${res.statusCode}`);
      }
    } else {
      res.status(HttpCode.NOT_FOUND).json(`Incorrect ids!`);
      logger.error(`End request with status code ${res.statusCode}`);
    }
  } else {
    res.status(HttpCode.BAD_REQUEST).json(`Incorrect parameters!`);
    logger.error(`End request with status code ${res.statusCode}`);
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
      res.status(HttpCode.OK).json(mocks);
      logger.info(`End request with status code ${res.statusCode}`);
    } else {
      res.status(HttpCode.BAD_REQUEST).json(`Incorrect article`);
      logger.error(`End request with status code ${res.statusCode}`);
    }
  } else {
    res.status(HttpCode.BAD_REQUEST).send(`Invalid parameters`);
    logger.error(`End request with status code ${res.statusCode}`);
  }
});

module.exports = articlesRoute;
