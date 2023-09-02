const usersRouter = require('express').Router();
import {
  getUsers,
  getUserByUsername,
  getCommentsByUsername,
} from '../controllers/users-controllers.js';

usersRouter
  .route('/')
  .get(getUsers)
  .post((_req, res) => {
    res.status(200).send('All OK from POST /api/users');
  })
  .patch((_req, res) => {
    res.status(200).send('All OK from PATCH /api/users');
  });

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch((_req, res) => {
    res.status(200).send('All OK from PATCH /api/users/:username');
  });

usersRouter.route('/:username/comments').get(getCommentsByUsername);

export default usersRouter;
