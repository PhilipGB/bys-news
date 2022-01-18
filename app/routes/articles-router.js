const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchVotesById,
  getArticles,
  getArticleComments,
  postArticleComment,
} = require("../controllers/articles-controllers.js");

articlesRouter.get("/", getArticles);

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchVotesById);

articlesRouter.get("/:article_id/comments", getArticleComments);
articlesRouter.post("/:article_id/comments", postArticleComment);

module.exports = articlesRouter;
