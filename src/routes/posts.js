"use strict";

const fs = require(`fs`).promises;
const { HttpCode } = require(`../service/constants`);
const FILENAME = `mocks.json`;

const { Router } = require(`express`);
const postRouter = new Router();

postRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    console.log(mocks)
    const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
    res.status(HttpCode.OK).send(`<ul>${message}</ul>`);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Temporary issue, please contact system administrator.`);
  }
});

module.exports = postRouter;
