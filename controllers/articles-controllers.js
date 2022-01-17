const {
  selectArticleById,
  updateVotesById,
} = require("../models/articles-models.js");

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;

  selectArticleById(article_id).then((article) => {
    res.status(200).send({ article: article });
  });
};

exports.patchVotesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateVotesById(article_id, parseInt(inc_votes))
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};
