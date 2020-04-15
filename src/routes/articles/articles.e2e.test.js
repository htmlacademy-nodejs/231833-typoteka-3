'use strict';

process.argv.push(`--server`);

const request = require(`supertest`);
const app = require(`../../service/cli/app`);

describe(`Articles API GET end-points`, () => {
  test(`When get articles status code should be 200`, async () => {
    const res = await request(app).get(`/api/articles`);
    expect(res.body[0]).toHaveProperty(`id`);
    expect(res.body[0]).toHaveProperty(`title`);
    expect(res.body[0]).toHaveProperty(`comments`);
    expect(res.body[0]).toHaveProperty(`createdDate`);
    expect(res.body[0]).toHaveProperty(`category`);
    expect(res.statusCode).toBe(200);
  });

  test(`When get articles with correct /:articleId status code should be 200`, async () => {
    const res = await request(app).get(`/api/articles`);
    const id = res.body[0].id;
    const resId = await request(app).get(`/api/articles/${id}`);
    expect(res.body[0]).toHaveProperty(`id`);
    expect(res.body[0]).toHaveProperty(`title`);
    expect(res.body[0]).toHaveProperty(`comments`);
    expect(res.body[0]).toHaveProperty(`createdDate`);
    expect(res.body[0]).toHaveProperty(`category`);
    expect(resId.statusCode).toBe(200);
  });

  test(`When get articles with incorrect /:articleId status code should be 400`, async () => {
    const id = 98972340973209487302947903274093274932749;
    const resId = await request(app).get(`/api/articles/${id}`);
    expect(resId.statusCode).toBe(404);
  });

  test(`When get comment for article with correct comment id, status code should be 200`, async () => {
    const articleRes = await request(app).get(`/api/articles`);
    const id = articleRes.body[0].id;
    const commentsRes = await request(app).get(`/api/articles/${id}/comments`);
    expect(commentsRes.body[0]).toHaveProperty(`id`);
    expect(commentsRes.body[0]).toHaveProperty(`text`);
    expect(commentsRes.statusCode).toBe(200);
  });

  test(`When get comment for article with incorrect comment id, status code should be 400`, async () => {
    const id = 123213213213213213213;
    const commentsRes = await request(app).get(`/api/articles/${id}/comments`);
    expect(commentsRes.statusCode).toBe(400);
  });
});

describe(`Articles API POST end-points`, () => {
  test(`Should retrieve article with title 'Mock Title'`, async () => {
    const newArticle = ({
      comments: [],
      title: `Mock Title`,
      createdDate: new Date(),
      announce: `Mock Announce`,
      fullText: `Mock Text`,
      category: `Mock Category`,
      img: `Mock Image`
    });
    const res = await request(app)
      .post(`/api/articles`)
      .send(newArticle);

    const id = res.body.slice(-1)[0].id;
    const articleResponse = await request(app)
      .get(`/api/articles/${id}`);

    expect(articleResponse.body.title).toBe(`Mock Title`);
  });

  test(`Should not retrieve article with missing title`, async () => {
    const newArticle = ({
      comments: [],
      createdDate: new Date(),
      announce: `Mock Announce`,
      fullText: `Mock Text`,
      category: `Mock Category`,
      img: `Mock Image`
    });
    const res = await request(app)
      .post(`/api/articles`)
      .send(newArticle);

    expect(res.statusCode).toBe(400);
  });

  test(`Should retrieve comment with correct parameters`, async () => {
    const resArticle = await request(app).get(`/api/articles`);
    const resId = resArticle.body[0].id;
    const resComment = await request(app).post(`/api/articles/${resId}/comments`).send({text: `New comment`});
    expect(resComment.statusCode).toBe(200);
    expect(resComment.body[0].comments.slice(-1)[0].text).toBe(`New comment`);
  });
});

describe(`Articles API PUT end-points`, () => {
  test(`Should update article with new properties`, async () => {
    const title = `New Title`;
    const announce = `New Announce`;
    const category = `New category`;
    const res = await request(app).get(`/api/articles`);
    const id = res.body[0].id;
    const result = await request(app).put(`/api/articles/${id}`).send({
      title,
      announce,
      category
    });
    expect(result.body.title).toBe(`New Title`);
    expect(result.body.announce).toBe(`New Announce`);
    expect(result.body.category).toBe(`New category`);
  });

  test(`Should not update article with missing title property`, async () => {
    const announce = `New Announce`;
    const category = `New category`;
    const res = await request(app).get(`/api/articles`);
    const id = res.body[0].id;
    const result = await request(app).put(`/api/articles/${id}`).send({
      announce,
      category
    });
    expect(result.statusCode).toBe(400);
  });
});

describe(`Articles API DELETE end-points`, () => {
  test(`Should delete article with correct id`, async () => {
    const res = await request(app).get(`/api/articles`);
    const id = res.body[0].id;
    const result = await request(app).delete(`/api/articles/${id}`);
    expect(result.body[0].id !== id);
    expect(result.statusCode).toBe(200);
  });

  test(`Should not delete article with incorrect id`, async () => {
    const id = 121221111212321321321;
    const result = await request(app).delete(`/api/articles/${id}`);
    expect(result.statusCode).toBe(404);
  });

  test(`Should delete comment with correct comment id`, async () => {
    const resArticle = await request(app).get(`/api/articles`);
    const resId = resArticle.body[0].id;
    const resComment = await request(app).get(`/api/articles/${resId}/comments`);
    const comId = resComment.body[0].id;
    const removeComment = await request(app).delete(`/api/articles/${resId}/comments/${comId}`);
    const withoutComment = await request(app).delete(`/api/articles/${resId}/comments/${comId}`);
    expect(withoutComment.statusCode).toBe(404);
    expect(removeComment.statusCode).toBe(200);
  });

  test(`Should not delete comment with incorrect comment id`, async () => {
    const resArticle = await request(app).get(`/api/articles`);
    const resId = resArticle.body[0].id;
    const comId = 234234234324234;
    const removeComment = await request(app).delete(`/api/articles/${resId}/comments/${comId}`);
    expect(removeComment.statusCode).toBe(404);
  });
});
