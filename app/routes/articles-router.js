const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchVotesById,
  getArticles,
  getArticleComments,
  postArticleComment,
  postArticle,
  removeArticleById,
} = require("../controllers/articles-controllers.js");

articlesRouter.route("/").get(getArticles).post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchVotesById)
  .delete(removeArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment);

module.exports = articlesRouter;
