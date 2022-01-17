const usersRouter = require("express").Router();

usersRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "All OK from Users Router" });
});

usersRouter.get("/:username", (req, res) => {
  const { username } = req.params;

  res.status(200).send({ msg: `All OK from Users Router Name ${username}` });
});

module.exports = usersRouter;
