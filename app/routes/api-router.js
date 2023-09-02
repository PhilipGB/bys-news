const apiRouter = require('express').Router();
import { getApi } from '../controllers/api-controllers.js';
import topicsRouter from './topics-router.js';
import articlesRouter from './articles-router.js';
import commentsRouter from './comments-router.js';
import usersRouter from './users-router.js';

apiRouter.route('/').get(getApi);

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
