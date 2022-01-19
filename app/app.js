const express = require("express");
const apiRouter = require("./routes/api-router.js");
const { errorHandlers, invalidURL } = require("./error-handlers.js");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api", apiRouter);
app.all("/*", invalidURL);
app.use(errorHandlers);

module.exports = app;
