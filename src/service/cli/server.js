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
    try {
      await sequelize.authenticate();
      logger.info(`Connected to database successfully!`);
      const [customPort] = args;
      const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
      await readMock;
      app.listen(port, async (err) => {
        if (err) {
          return logger.error(`Internal server error`, err);
        }
        return logger.info(`Server started on port ${port}`);
      });
    } catch (e) {
      logger.error(`Failed connect to database: ${e}`);
      process.exit(1);
    }
  }
};
