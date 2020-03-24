"use strict";

const fs = require(`fs`).promises;
const {HttpCode} = require(`../service/constants`);
const FILENAME = `mocks.json`;

const {Router} = require(`express`);
const postRouter = new Router();

postRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.status(HttpCode.OK).json(mocks);
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.status(HttpCode.NOT_FOUND).json([]);
    } else {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
  }
});

module.exports = postRouter;
