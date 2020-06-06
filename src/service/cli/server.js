"use strict";

const DEFAULT_PORT = 3000;
const {readMock} = require(`../cli/readMock`);
const {getLogger} = require(`../logger`);
const logger = getLogger();
const app = require(`./app`);
const sequelize = require(`../db`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    await readMock;
    app.listen(port, async (err) => {
      try {
        await sequelize.authenticate();
        logger.info(`Connected to database successfully!`);
      } catch (e) {
        return logger.error(`Failes connect to database: ${e}`);
      }
      if (err) {
        return logger.error(`Internal server error`, err);
      }
      return logger.info(`Server started on port ${port}`);
    });
  }
};
