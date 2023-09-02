const {
  selectArticleById,
  updateVotesById,
  selectArticles,
  selectArticleComments,
  insertArticleComment,
  insertArticle,
  deleteArticle,
} = require("../models/articles-models.js");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.patchVotesById = (req, res, next) => {
  if (JSON.stringify(Object.keys(req.body)) !== '["inc_votes"]') {
    res.status(405).send({ msg: "Invalid request body" });
  }

  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateVotesById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;
  selectArticles(sort_by, order, topic, author)
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const { author, title, topic, body } = req.body;
  insertArticle(author, title, topic, body)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertArticleComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch(next);
};

exports.removeArticleById = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};
