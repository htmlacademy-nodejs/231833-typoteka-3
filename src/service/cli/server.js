"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const express = require(`express`);
const app = express();
const DEFAULT_PORT = 3000;

const postRoutes = require(`../../routes/posts`);

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(`/posts`, postRoutes);

// const onClientConnect = async (req, res) => {
//   const notFoundMessageText = `Not found`;

//   switch (req.url) {
//     case `/`:
//       try {
//         const fileContent = await fs.readFile(FILENAME);
//         const mocks = JSON.parse(fileContent);
//         const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
//         sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
//       } catch (err) {
//         sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
//       }

//       break;
//     default:
//       sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
//       break;
//   }
// };

module.exports = {
  name: `--server`,
  run(args) {
    console.log(args);
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
    // http
    //   .createServer(onClientConnect)
    //   .listen(port)
    //   .on(`listening`, (err) => {
    //     if (err) {
    //       return console.error(`Ошибка при создании сервера`, err);
    //     }

    //     return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    //   });
  }
};
