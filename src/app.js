import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// import routes from './routes/router';
import swaggerSpec from './utils/swagger';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerSpec.serve, swaggerSpec.setup);

// app.use('/api/v1', routes(Router));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.status) res.status(error.status).send({ error });
  else throw error;
});

export default app;
