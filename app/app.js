const express = require("express");
const apiRouter = require("./routes/api-router.js");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api", apiRouter);

// errors
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Server error" });
  }
});

module.exports = app;
