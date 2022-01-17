const commentsRouter = require("express").Router();

commentsRouter.delete("/", (req, res) => {
  res.status(204).send({ msg: "All OK from Delete Comments Router" });
});

module.exports = commentsRouter;
