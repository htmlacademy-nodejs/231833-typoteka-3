"use strict";

const path = require(`path`);
const express = require(`express`);
const {getLogger} = require(`../../src/service/logger`);
const logger = getLogger();

const articlesRoute = require(`../routes/articles`);
const myRoute = require(`../routes/my`);
const mainRoute = require(`../routes/main`);
const searchRoute = require(`../routes/search`);

const app = express();
const DEFAULT_PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);
app.use(express.static(`markup`));

app.use(`/my`, myRoute);
app.use(`/articles`, articlesRoute);
app.use(`/search`, searchRoute);
app.use(`/`, mainRoute);
app.use(`/`, (req, res) => {
  logger.debug(`Start request to url ${req.url}, doesn't exist`);
  res.status(400).render(`errors/400`);
});

app.listen(DEFAULT_PORT, () => console.log(`Server is running on port ${DEFAULT_PORT}`));
