const db = require("../db/connection.js");

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
      return result.rows[0];
    });
};
