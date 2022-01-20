const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("All OK from GET /api/users");
  })
  .post((req, res) => {
    res.status(200).send("All OK from POST /api/users");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users");
  });

usersRouter
  .route("/:username")
  .get((req, res) => {
    res.status(200).send("All OK from GET /api/users/:username");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users/:username");
  });

// usersRouter.get("/", (req, res) => {
//   res.status(200).send({ msg: "All OK from Users Router" });
// });

// usersRouter.get("/:username", (req, res) => {
//   const { username } = req.params;

//   res.status(200).send({ msg: `All OK from Users Router Name ${username}` });
// });

module.exports = usersRouter;
