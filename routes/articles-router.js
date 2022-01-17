const articlesRouter = require("express").Router();
const { getArticleById } = require("../controllers/articles-controllers.js");

articlesRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "All OK from Articles Router" });
});

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.patch("/:article_id", (req, res) => {
  const { article_id } = req.params;

  res
    .status(200)
    .send({ msg: `All OK from Patch Articles Router ID ${article_id}` });
});

articlesRouter.get("/:article_id/comments", (req, res) => {
  const { article_id } = req.params;

  res.status(200).send({
    msg: `All OK from Articles/:article_id/comments Router ID ${article_id}`,
  });
});

articlesRouter.post("/:article_id/comments", (req, res) => {
  const { article_id } = req.params;

  res.status(200).send({
    msg: `All OK from Post Articles/:article_id/comments Router ID ${article_id}`,
  });
});

module.exports = articlesRouter;
