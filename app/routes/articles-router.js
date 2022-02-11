const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchVotesById,
  getArticles,
  getArticleComments,
  postArticleComment,
  postArticle,
} = require("../controllers/articles-controllers.js");

articlesRouter.route("/").get(getArticles).post(postArticle);

articlesRouter.route("/:article_id").get(getArticleById).patch(patchVotesById);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment);

module.exports = articlesRouter;
