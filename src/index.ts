import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import * as middlewares from './middlewares';
import { logger } from './utils/logger';
import books from './tables/book.json';
import authors from './tables/author.json';
import publishers from './tables/publisher.json';
import genres from './tables/genre.json';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: `🦄🌈✨👋🌎🌍🌏✨🌈🦄`,
  });
});

app.get('/api/data/books', (_req, res) => {
  res.status(200).json(books);
});

app.get('/api/data/authors', (_req, res) => {
  res.status(200).json(authors);
});

app.get('/api/data/publishers', (_req, res) => {
  res.status(200).json(publishers);
});

app.get('/api/data/genres', (_req, res) => {
  res.status(200).json(genres);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Listening: http://localhost:${port}`);
});
