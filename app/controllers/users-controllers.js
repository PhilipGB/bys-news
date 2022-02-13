const {
  selectUsers,
  selectUserByUsername,
  selecCommentsByUsername,
} = require("../models/users-models.js");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};

exports.getCommentsByUsername = (req, res, next) => {
  const { username } = req.params;

  selecCommentsByUsername(username)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};
