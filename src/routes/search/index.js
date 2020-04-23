"use strict";

const {Router} = require(`express`);
const searchRouter = new Router();
const axios = require(`axios`);
const {HttpCode} = require(`../../service/constants`);

searchRouter.get(`/`, async (req, res) => {
  res.status(HttpCode.OK).render(`search`);
});

searchRouter.post(`/`, async (req, res) => {
  const {search} = req.body;
  try {
    const result = await axios.get(`http://127.0.0.1:3000/api/search?query=${encodeURIComponent(search.toLowerCase())}`);
    res.status(HttpCode.OK).render(`search`, {data: result.data});
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

module.exports = searchRouter;
