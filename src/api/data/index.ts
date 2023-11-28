import express from 'express';
import authors from '../../tables/author.json';
import books from '../../tables/book.json';
import genres from '../../tables/genre.json';
import publishers from '../../tables/publisher.json';

const router = express.Router();

router.get('/data/books', (_req, res) => {
  res.status(200).json({
    data: books,
  });
});

router.get('/data/authors', (_req, res) => {
  res.status(200).json({
    data: authors,
  });
});

router.get('/data/genres', (_req, res) => {
  res.status(200).json({
    data: genres,
  });
});

router.get('/data/publishers', (_req, res) => {
  res.status(200).json({
    data: publishers,
  });
});

export default router;
