"use strict";

const fs = require(`fs`).promises;
const {MOCKS_FILENAME} = require(`../../service/constants`);

const readContent = async () => {
  try {
    const fileContent = await fs.readFile(MOCKS_FILENAME, `utf8`);
    return JSON.parse(fileContent);
  } catch (err) {
    if (err.code === `ENOENT`) {
      return [];
    } else {
      return `Something went wrong`;
    }
  }
};

module.exports.readMock = readContent();
