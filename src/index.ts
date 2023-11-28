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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 3000 },
})
  .then(({ url }) => {
    logger.info(`🚀  Server ready at: ${url}`);
  })
  .catch(logger.error);
