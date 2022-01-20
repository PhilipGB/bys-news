const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("0. GET /notARoute", () => {
  it("responds with status: 404 for invalid route", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: "Invalid URL",
          })
        );
      });
  });
});

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
  test("status:404, article id not found", () => {
    const article_id = 1000;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "No article found for id 1000",
        });
      });
  });
  test("status:400, article id invalid", () => {
    const article_id = "INVALID";
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Bad Request",
        });
      });
  });
});

describe("3. PATCH /api/articles/:article_id", () => {
  test("status:200, responds with article with increased vote count", () => {
    const article = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(article)
      .expect(200)
      .then(({ body }) => {
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
        expect(body.article.votes).toEqual(50);
      });
  });
  test("status:400, responds with error for invalid vote", () => {
    const article = {
      inc_votes: "not_number",
    };
    return request(app)
      .patch("/api/articles/1")
      .send(article)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid vote value");
      });
  });
  test("status:405, responds with error for missing vote key", () => {
    const article = {};
    return request(app)
      .patch("/api/articles/1")
      .send(article)
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid request body");
      });
  });
  test("status:405, responds with error for other property on request body", () => {
    const article = {
      inc_votes: 5,
      invalid: "additional property",
    };
    return request(app)
      .patch("/api/articles/1")
      .send(article)
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid request body");
      });
  });
  test("status:404, article id not found", () => {
    const article = { inc_votes: -50 };
    return request(app)
      .patch("/api/articles/1000")
      .send(article)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "No article found for id 1000",
        });
      });
  });
});

describe("4. GET /api/articles", () => {
  it("responds with status: 200 and a json object containing all articles with comment count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            articles: expect.any(Array),
          })
        );
        expect(res.body.articles[0]).toEqual({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
        });
      });
  });

  it("responds with status: 400 for invalid sort query", () => {
    return request(app)
      .get("/api/articles?sort_by=INVALID")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: "Invalid sort query",
          })
        );
      });
  });

  it("responds with status: 400 for invalid sort order", () => {
    return request(app)
      .get("/api/articles?order=INVALID")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: "Invalid order query",
          })
        );
      });
  });

  it("responds with status: 400 for invalid topics query", () => {
    return request(app)
      .get("/api/articles?topic=INVALID;")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: "Invalid topic query",
          })
        );
      });
  });

  it("responds with status: 200 and a json object containing articles sorted by votes", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            articles: expect.any(Array),
          })
        );
      });
  });

  it("responds with status: 200 and a json object containing articles sorted descending", () => {
    return request(app)
      .get("/api/articles?order=desc")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            articles: expect.any(Array),
          })
        );
      });
  });

  it('responds with status: 200 and a object containing "cats" topic', () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            articles: expect.any(Array),
          })
        );
        expect(
          res.body.articles.every((article) => article.topic === "cats")
        ).toBe(true);
      });
  });
});

describe("5. GET /api/articles/:article_id/comments", () => {
  test("status:200, responds with an array of comments objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
  test("status:404, article id not found", () => {
    const article_id = 1000;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "No article found for id 1000",
        });
      });
  });
  test("status:400, article id invalid", () => {
    const article_id = "INVALID";
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Bad Request",
        });
      });
  });
});

describe("6. POST /api/articles/:article_id/comments", () => {
  test("status:201, responds with posted comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Test commment on article 1",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toEqual({
          article_id: 1,
          comment_id: expect.any(Number),
          created_at: expect.any(String),
          votes: expect.any(Number),
          author: newComment.username,
          body: newComment.body,
        });
      });
  });
  test("status:401, Invalid username", () => {
    const newComment = {
      username: "INVALID",
      body: "Test commment on article 1",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(401)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Invalid username",
        });
      });
  });
  test("status:405, request body missing", () => {
    const newComment = {
      username: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid request body");
      });
  });
  test("status:404, article ID not found", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Test commment on article 1",
    };
    return request(app)
      .post("/api/articles/1000/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "No article found for id 1000" });
      });
  });
});

describe("7. DELETE /api/comments/:comment_id", () => {
  test("status:204, responds with no content", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("status: 404, comment id does not exist", () => {
    return request(app).delete("/api/comments/1000").expect(404);
  });
  test("status: 400, invalid comment id", () => {
    return request(app).delete("/api/comments/INVALID").expect(400);
  });
});

describe("8. GET /api", () => {
  test("status:200, responds with an object of endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(require("../app/endpoints.json"));
      });
  });
});
