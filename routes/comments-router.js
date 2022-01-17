const commentsRouter = require("express").Router();

commentsRouter.delete("/", (req, res) => {
  res.status(204).send({ msg: "All OK from Delete Comments Router" });
});

commentsRouter.patch("/", (req, res) => {
  res.status(200).send({ msg: "All OK from Patch Comments Router" });
});

module.exports = commentsRouter;
