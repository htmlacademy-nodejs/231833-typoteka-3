"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const express = require(`express`);
const app = express();
const DEFAULT_PORT = 3000;

const postRoutes = require(`../../routes/posts`);

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(express.json());
app.use(`/posts`, postRoutes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
