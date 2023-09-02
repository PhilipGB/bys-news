const commentsRouter = require("express").Router();
const { removeComment } = require("../controllers/comments-controllers.js");

commentsRouter
  .route("/:comment_id")
  .get((req, res) => {
    res.status(200).send("All ok from GET /api/comments/:comment_id");
  })
  .patch((req, res) => {
    res.status(200).send({ msg: "All OK from Patch Comments Router" });
  })
  .delete(removeComment);

module.exports = commentsRouter;
