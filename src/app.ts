import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import api from './api';
import * as middlewares from './middlewares';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: `🦄🌈✨👋🌎🌍🌏✨🌈🦄`,
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export { app };
