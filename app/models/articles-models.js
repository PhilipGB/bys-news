const db = require("../../db/connection.js");

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
    .then((result) => result.rows[0]);
};

exports.updateVotesById = (article_id, inc_votes) => {
  if (!inc_votes) {
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
      [inc_votes, article_id]
    )
    .then((result) => result.rows[0]);
};
