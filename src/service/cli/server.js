"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const express = require(`express`);
const app = express();
const DEFAULT_PORT = 3000;
const readMock = require(`../cli/readMock`);

const articlesRoute = require(`../../routes/articles`);
const categoriesRoute = require(`../../routes/categories`);
const searchRoute = require(`../../routes/search`);

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(express.json());
app.use(`/api/articles`, articlesRoute);
app.use(`/api/categories`, categoriesRoute);
app.use(`/search`, searchRoute);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    await readMock;
    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
