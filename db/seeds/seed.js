const format = require("pg-format");
const db = require("../connection.js");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  return (
    db
      // Drop tables
      .query(`DROP TABLE IF EXISTS comments;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS articles`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS topics`);
      })
      // Create tables
      .then(() => {
        return db.query(`
          CREATE TABLE topics (
            slug VARCHAR(63) PRIMARY KEY,
            description VARCHAR(255) NOT NULL
          );
        `);
      })
      .then(() => {
        return db.query(`
          CREATE TABLE users (
            username VARCHAR(63) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            avatar_url VARCHAR(255) NOT NULL
          );
        `);
      })
      .then(() => {
        return db.query(`
          CREATE TABLE articles (
            article_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            topic VARCHAR(63) REFERENCES topics(slug),
            author VARCHAR(63) REFERENCES users(username),
            body VARCHAR NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            votes INT DEFAULT 0
          );
        `);
      })
      .then(() => {
        return db.query(`
          CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            body VARCHAR NOT NULL,
            votes INT DEFAULT 0,
            author VARCHAR(63) REFERENCES users(username),
            article_id INT REFERENCES articles(article_id),
            created_at TIMESTAMP DEFAULT now()
          );
        `);
      })
      // insert data
      .then(() => {
        const insertTopics = format(
          `
          INSERT INTO topics
            (slug, description)
          VALUES
            %L;
        `,
          topicData.map((topic) => [topic.slug, topic.description])
        );
        return db.query(insertTopics);
      })
      .then(() => {
        const insertUsers = format(
          `
          INSERT INTO users
            (username, name, avatar_url)
          VALUES
            %L;
        `,
          userData.map((user) => [user.username, user.name, user.avatar_url])
        );
        return db.query(insertUsers);
      })
      .then(() => {
        const insertArticles = format(
          `
            INSERT INTO articles
              (title, topic, author, body, created_at, votes)
            VALUES
              %L;
          `,
          articleData.map((article) => [
            article.title,
            article.topic,
            article.author,
            article.body,
            article.created_at,
            article.votes,
          ])
        );
        return db.query(insertArticles);
      })
      .then(() => {
        const insertComments = format(
          `
            INSERT INTO comments
              (author, article_id, votes, created_at, body)
            VALUES
              %L
            RETURNING *;
          `,
          commentData.map((comment) => [
            comment.author,
            comment.article_id,
            comment.votes,
            comment.created_at,
            comment.body,
          ])
        );
        return db.query(insertComments);
      })
  );
};

module.exports = seed;
