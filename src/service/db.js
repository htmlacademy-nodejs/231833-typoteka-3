'use strict';
require(`dotenv`).config();

const {Sequelize} = require(`sequelize`);

const {DB_DATABASE, DB_USER, DB_PASSWORD, DB_ADDRESS} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_ADDRESS,
  dialect: `postgres`
});

module.exports = sequelize;
