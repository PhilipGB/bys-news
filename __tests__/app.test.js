const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("1. GET /api/topics", () => {
  test("status:200, responds with an array of topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
});

describe("2. GET /api/articles/:article_id", () => {
  test("status:200, responds with a single matching article", () => {
    const article_id = 1;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          author: expect.any(String),
          title: expect.any(String),
          article_id: article_id,
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
        });
      });
  });
});

describe("3. PATCH /api/articles", () => {
  test("status:200, responds with article with increased vote count", () => {
    const article = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(article)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.article.votes).toEqual(101);
      });
  });
  test("status:200, responds with article with decreased vote count", () => {
    const article = {
      inc_votes: -50,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(article)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.article.votes).toEqual(50);
      });
  });
});
