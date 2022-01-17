const { selectArticleById } = require("../models/articles-models.js");

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;

  selectArticleById(article_id).then((article) => {
    res.status(200).send({ article: article });
  });
};
