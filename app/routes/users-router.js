const usersRouter = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  getCommentsByUsername,
} = require("../controllers/users-controllers.js");

usersRouter
  .route("/")
  .get(getUsers)
  .post((req, res) => {
    res.status(200).send("All OK from POST /api/users");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users");
  });

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users/:username");
  });

usersRouter.route("/:username/comments").get(getCommentsByUsername);

module.exports = usersRouter;
