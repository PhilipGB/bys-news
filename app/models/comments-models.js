import { query } from '../../db/connection.js';

export function deleteComment(comment_id) {
  return query(
    `
        DELETE FROM comments WHERE comment_id = $1;
      `,
    [comment_id]
  ).then((result) => {
    if (!result.rowCount) {
      throw {
        status: 404,
        msg: `No comment found for id ${comment_id}`,
      };
    }
  });
}
