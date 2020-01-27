"use strict";

const {Cli} = require(`./cli`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  MAX_COUNT
} = require(`./constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, userParam] = userArguments;

if (userCommand === `--generate` && userParam > MAX_COUNT) {
  console.log(`Не больше 1000 публикаций`);
  process.exit(ExitCode.error);
}

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
