const db = require("../../db/connection.js");

exports.selectUsers = () => {
  return db
    .query(
      `
            SELECT *
            FROM users;
        `
    )
    .then((result) => result.rows);
};

exports.selectUserByUsername = (username) => {
  return db
    .query(
      `
              SELECT *
              FROM users
              WHERE username = $1;
          `,
      [username]
    )
    .then((result) => {
      if (!result.rowCount) {
        return Promise.reject({
          status: 404,
          msg: `No user found for ${username}`,
        });
      }
      return result.rows[0];
    });
};

exports.selecCommentsByUsername = (username) => {
  return db
    .query(
      `
              SELECT 
                comments.author AS username, comments.*
            
              FROM comments
              
              WHERE comments.author = $1;
          `,
      [username]
    )
    .then((result) => {
      if (!result.rowCount) {
        return Promise.reject({
          status: 404,
          msg: `No user found for ${username}`,
        });
      }
      return result.rows;
    });
};
