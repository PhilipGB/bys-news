const express = require('express');
const { apiRouter } = require('./routes/index.js');
const { errorHandlers, invalidURL } = require('./error-handlers.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// TODO Logging
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api', apiRouter);
app.all('/*', invalidURL);
app.use(errorHandlers);

module.exports = app;
