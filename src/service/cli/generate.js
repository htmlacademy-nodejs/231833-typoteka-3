"use strict";

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid/async`);

const {getRandomInt, shuffle} = require(`../utils`);
const fs = require(`fs`).promises;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateID = async () => {
  try {
    const id = await nanoid();
    return id;
  } catch (e) {
    throw new Error(`Can not generate ID`, e.message);
  }
};

const generateCommentsArray = async (comments) => {
  const id = await generateID();
  return ({
    id,
    text: comments[getRandomInt(1, comments.length - 1)]
  });
};

const generateComments = async (comments) =>
  Array(getRandomInt(1, comments.length - 1))
    .fill({}).map(async () => await generateCommentsArray(comments));

const generateOffersArray = async (titles, categories, sentences, comments) => {
  const id = await generateID();
  const coms = await generateComments(comments);
  const result = await Promise.all(coms);
  return ({
    id,
    comments: result,
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: new Date(getRandomInt(new Date().setMonth(-2), new Date().setMonth(0))),
    announce: shuffle(sentences)
      .slice(1, 5)
      .join(` `),
    fullText: shuffle(sentences)
      .slice(1, sentences.length - 1)
      .join(` `),
    category:
      categories[Math.floor(Math.random() * Object.keys(categories).length)]
  });
};

const generateOffers = async (count, titles, categories, sentences, comments) =>
  await Promise.all(Array(count)
    .fill({})
    .map(async () => await generateOffersArray(titles, categories, sentences, comments)));

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(await generateOffers(countOffer, titles, categories, sentences, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
