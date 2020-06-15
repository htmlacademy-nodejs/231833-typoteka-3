'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const version = require(`./version`);
const server = require(`./server`);
const {getLogger} = require(`../logger`);
const logger = getLogger();
const sequelize = require(`../db`);

const checkDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info(`Connected to database successfully!`);
  } catch (e) {
    logger.error(`Failed connect to database: ${e}`);
    process.exit(1);
  }
};

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server
};

module.exports = {
  Cli,
  checkDatabase
};
