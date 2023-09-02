import {
  selectUsers,
  selectUserByUsername,
  selectCommentsByUsername,
} from '../models/users-models.js';

export function getUsers(_req, res, next) {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
}

export function getUserByUsername(req, res, next) {
  const { username } = req.params;

  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
}

export function getCommentsByUsername(req, res, next) {
  const { username } = req.params;

  selectCommentsByUsername(username)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
}
