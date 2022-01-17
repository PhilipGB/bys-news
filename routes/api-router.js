const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "All OK from API Router" });
});

module.exports = apiRouter;
