const topicsRouter = require('express').Router();
import { getTopics } from '../controllers/topics-controllers.js';

topicsRouter.route('/').get(getTopics);

export default topicsRouter;
