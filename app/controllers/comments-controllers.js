const { deleteComment } = require("../models/comments-models.js");

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
