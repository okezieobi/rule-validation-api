import express, { Router, json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import routes from './router';
import swaggerSpec from './utils/swagger';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerSpec.serve, swaggerSpec.setup);

app.use(routes(Router));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.statusCode) res.status(error.statusCode).send({ error });
  else throw error;
});

export default app;
