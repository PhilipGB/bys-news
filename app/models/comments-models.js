const db = require("../../db/connection.js");

exports.deleteComment = (comment_id) => {
  return db
    .query(
      `
        DELETE FROM comments WHERE comment_id = $1;
      `,
      [comment_id]
    )
    .then((result) => {
      if (!result.rowCount) {
        throw {
          status: 404,
          msg: `No comment found for id ${comment_id}`,
        };
      }
    });
};
