"use strict";

const fs = require(`fs`).promises;
const {HttpCode, MOCKS_FILENAME} = require(`../service/constants`);

const fileMocks = async (req, res, next) => {
  try {
    const fileContent = await fs.readFile(MOCKS_FILENAME);
    const stat = await fs.stat(MOCKS_FILENAME);
    if (stat.size === 0) {
      res.status(HttpCode.OK).json([]);
      return;
    }
    const mocks = JSON.parse(fileContent);
    req.mocks = mocks;
    next();
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.status(HttpCode.NOT_FOUND).json([]);
    } else {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
  }
};

const withAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports.readMock = withAsync(fileMocks);
