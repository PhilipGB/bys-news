const commentsRouter = require("express").Router();
const { removeComment } = require("../controllers/comments-controllers.js");

commentsRouter.delete("/:comment_id", removeComment);

commentsRouter.patch("/", (req, res) => {
  res.status(200).send({ msg: "All OK from Patch Comments Router" });
});

module.exports = commentsRouter;
