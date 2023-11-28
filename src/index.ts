import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import authors from './tables/author.json';
import books from './tables/book.json';
import genres from './tables/genre.json';
import publishers from './tables/publisher.json';
import { logger } from './utils/logger';
import { readFileSync } from 'fs';
import path from 'path';

const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), {
  encoding: 'utf-8',
});

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    publishers: () => publishers,
    genres: () => genres,
  },
  Book: {
    authors: (book: any) => {
      return book.authors.map((id: any) =>
        authors.find((author) => author.id === id)
      );
    },
    publishers: (book: any) => {
      return book.publishers.map((id: any) =>
        publishers.find((publisher) => publisher.id === id)
      );
    },
    genres: (book: any) => {
      return book.genres.map((id: any) =>
        genres.find((genre) => genre.id === id)
      );
    },
  },
  Author: {
    books: (author: any) => {
      return books.filter((book) => book.authors.includes(author.id));
    },
    publishers: (author: any) => {
      return books
        .filter((book) => book.authors.includes(author.id))
        .map((book) => book.publishers)
        .flat()
        .map((id) => publishers.find((publisher) => publisher.id === id));
    },
    genres: (author: any) => {
      return books
        .filter((book) => book.authors.includes(author.id))
        .map((book) => book.genres)
        .flat()
        .map((id) => genres.find((genre) => genre.id === id));
    },
  },
  Publisher: {
    books: (publisher: any) => {
      return books.filter((book) => book.publishers.includes(publisher.id));
    },
    authors: (publisher: any) => {
      return books
        .filter((book) => book.publishers.includes(publisher.id))
        .map((book) => book.authors)
        .flat()
        .map((id) => authors.find((author) => author.id === id));
    },
    genres: (publisher: any) => {
      return books
        .filter((book) => book.publishers.includes(publisher.id))
        .map((book) => book.genres)
        .flat()
        .map((id) => genres.find((genre) => genre.id === id));
    },
  },
  Genre: {
    books: (genre: any) => {
      return books.filter((book) => book.genres.includes(genre.id));
    },
    authors: (genre: any) => {
      return books
        .filter((book) => book.genres.includes(genre.id))
        .map((book) => book.authors)
        .flat()
        .map((id) => authors.find((author) => author.id === id));
    },
    publishers: (genre: any) => {
      return books
        .filter((book) => book.genres.includes(genre.id))
        .map((book) => book.publishers)
        .flat()
        .map((id) => publishers.find((publisher) => publisher.id === id));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    logger.info(`🚀  Server ready at: ${url}`);
  })
  .catch(logger.error);
