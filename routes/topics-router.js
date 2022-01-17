const topicsRouter = require("express").Router();

topicsRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "All OK from Topics Router" });
});

module.exports = topicsRouter;
