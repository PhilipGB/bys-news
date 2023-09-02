import {
  selectArticleById,
  updateVotesById,
  selectArticles,
  selectArticleComments,
  insertArticleComment,
  insertArticle,
  deleteArticle,
} from '../models/articles-models.js';

export function getArticleById(req, res, next) {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
}

export function patchVotesById(req, res, next) {
  if (JSON.stringify(Object.keys(req.body)) !== '["inc_votes"]') {
    res.status(405).send({ msg: 'Invalid request body' });
  }

  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateVotesById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
}

export function getArticles(req, res, next) {
  const { sort_by, order, topic, author } = req.query;
  selectArticles(sort_by, order, topic, author)
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch(next);
}

export function postArticle(req, res, next) {
  const { author, title, topic, body } = req.body;
  insertArticle(author, title, topic, body)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch(next);
}

export function getArticleComments(req, res, next) {
  const { article_id } = req.params;
  selectArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
}

export function postArticleComment(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertArticleComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch(next);
}

export function removeArticleById(req, res, next) {
  const { article_id } = req.params;
  deleteArticle(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
}
