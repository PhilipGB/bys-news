const apiRouter = require("express").Router();
const { getApi } = require("../controllers/api-controllers.js");
const topicsRouter = require("./topics-router.js");
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router.js");
const usersRouter = require("./users-router.js");

apiRouter.route("/").get(getApi);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
