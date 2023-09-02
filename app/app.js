import express, { json } from 'express';
import { apiRouter } from './routes/index.js';
import { errorHandlers, invalidURL } from './error-handlers.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

// TODO Logging
app.use((req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api', apiRouter);
app.all('/*', invalidURL);
app.use(errorHandlers);

export default app;
