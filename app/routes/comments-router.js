const commentsRouter = require('express').Router();
import { removeComment } from '../controllers/comments-controllers.js';

commentsRouter
  .route('/:comment_id')
  .get((_req, res) => {
    res.status(200).send('All ok from GET /api/comments/:comment_id');
  })
  .patch((_req, res) => {
    res.status(200).send({ msg: 'All OK from Patch Comments Router' });
  })
  .delete(removeComment);

export default commentsRouter;
