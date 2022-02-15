const db = require("../../db/connection.js");

exports.selectArticles = (
  sort_by = "created_at",
  order = "desc",
  topic,
  author
) => {
  if (
    ![
      "created_at",
      "author",
      "title",
      "topic",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  let articlesQuery = `
        SELECT 
            articles.author, articles.title, articles.article_id, 
            articles.topic, articles.created_at, articles.votes,
            COUNT(comments.*)::INTEGER AS comment_count
        FROM articles
        LEFT JOIN 
            comments ON comments.article_id = articles.article_id      
      `;

  // TODO fix for multiple WHERE
  if (topic) {
    if (!/^[A-Z]+$/i.test(topic)) {
      return Promise.reject({ status: 400, msg: "Invalid topic query" });
    }
    articlesQuery += ` WHERE articles.topic = '${topic}'`;
  } else if (author) {
    articlesQuery += ` WHERE articles.author = '${author}'`;
  }

  articlesQuery += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  return db.query(articlesQuery).then((result) => result.rows);
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `
            SELECT 
                *,
                (
                    SELECT COUNT(*)
                    FROM comments
                    WHERE article_id = $1
                )::INTEGER AS comment_count  
            FROM articles 
            WHERE article_id = $1;
        `,
      [article_id]
    )
    .then((result) => {
      if (result.rowCount) {
        return result.rows[0];
      }
      return Promise.reject({
        status: 404,
        msg: `No article found for id ${article_id}`,
      });
    });
};

exports.insertArticle = (author, title, topic, body) => {
  return db
    .query(
      `INSERT INTO articles 
        (title, topic, author, body) 
      VALUES 
        ($1, $2, $3, $4) 
      RETURNING *;`,
      [title, topic, author, body]
    )
    .then(({ rows }) => rows[0])
    .catch((err) => {
      throw err;
    });
};

exports.updateVotesById = (article_id, inc_votes) => {
  const votes = parseInt(inc_votes);
  if (!votes) {
    return Promise.reject({ status: 400, msg: "Invalid vote value" });
  }
  return db
    .query(
      `
          UPDATE articles 
          SET votes = votes + $1
          WHERE article_id = $2
          RETURNING *;
      `,
      [votes, article_id]
    )
    .then((result) => {
      if (result.rowCount) {
        return result.rows[0];
      }
      return Promise.reject({
        status: 404,
        msg: `No article found for id ${article_id}`,
      });
    });
};

exports.selectArticleComments = (article_id) => {
  return db
    .query(
      `
          SELECT 
              author AS username, body, comment_id 
          FROM comments 
          WHERE article_id = $1;
      `,
      [article_id]
    )
    .then((result) => {
      if (result.rowCount) {
        return result.rows;
      }
      return Promise.reject({
        status: 404,
        msg: `No article found for id ${article_id}`,
      });
    });
};

exports.insertArticleComment = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments 
        (author, article_id, body) 
      VALUES 
        ($1, $2, $3) 
      RETURNING *;`,
      [username, article_id, body]
    )
    .then(({ rows }) => rows[0])
    .catch((err) => {
      if (err.constraint === "comments_article_id_fkey") {
        return Promise.reject({
          status: 404,
          msg: `No article found for id ${article_id}`,
        });
      }

      throw err;
    });
};

exports.deleteArticle = (article_id) => {
  return db
    .query(
      `
        DELETE FROM articles WHERE article_id = $1;
      `,
      [article_id]
    )
    .then((result) => {
      if (!result.rowCount) {
        throw {
          status: 404,
          msg: `No article found for id ${article_id}`,
        };
      }
    });
};
