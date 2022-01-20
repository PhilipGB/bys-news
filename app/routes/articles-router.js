const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchVotesById,
  getArticles,
  getArticleComments,
  postArticleComment,
} = require("../controllers/articles-controllers.js");

articlesRouter.route("/").get(getArticles);

articlesRouter.route("/:article_id").get(getArticleById).patch(patchVotesById);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment);

module.exports = articlesRouter;
