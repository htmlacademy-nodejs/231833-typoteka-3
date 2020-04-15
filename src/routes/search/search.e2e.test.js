'use strict';

process.argv.push(`--server`);

const request = require(`supertest`);
const app = require(`../../service/cli/app`);

describe(`Search API end-points`, () => {
  test(`When get correct search status code should be 200 and return value`, async () => {
    const res = await request(app).get(`/api/articles`);
    const title = res.body[0].title;
    const queryTitle = `/search?query=${escape(title)}`;
    const result = await request(app).get(queryTitle);
    expect(res.body[0]).toHaveProperty(`title`);
    expect(result.statusCode).toBe(200);
  });

  test(`When get incorrect search status code should be 200 and return empty array`, async () => {
    const queryTitle = `/search?query=empty`;
    const result = await request(app).get(queryTitle);
    expect(result.body).toHaveLength(0);
    expect(result.statusCode).toBe(200);
  });
});
