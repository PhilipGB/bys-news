import { query } from '../../db/connection.js';

export function selectUsers() {
  return query(
    `
            SELECT *
            FROM users;
        `
  ).then((result) => result.rows);
}

export function selectUserByUsername(username) {
  return query(
    `
              SELECT *
              FROM users
              WHERE username = $1;
          `,
    [username]
  ).then((result) => {
    if (!result.rowCount) {
      return Promise.reject({
        status: 404,
        msg: `No user found for ${username}`,
      });
    }
    return result.rows[0];
  });
}

export function selectCommentsByUsername(username) {
  return query(
    `
              SELECT 
                comments.author AS username, 
                comments.*, articles.title,
                articles.topic
              FROM comments
              JOIN 
                articles ON articles.article_id = comments.article_id
              WHERE comments.author = $1;
          `,
    [username]
  ).then((result) => {
    if (!result.rowCount) {
      return Promise.reject({
        status: 404,
        msg: `No user found for ${username}`,
      });
    }
    return result.rows;
  });
}
