import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import authors from './tables/author.json';
import books from './tables/book.json';
import genres from './tables/genre.json';
import publishers from './tables/publisher.json';
import { logger } from './utils/logger';

const typeDefs = gql`
  type Book {
    id: Int!
    name: String!
    description: String!
    author: [Int!]!
    publisher: [Int!]!
    year: Int!
    url: String!
    genre: [Int!]!
  }

  type Author {
    id: Int!
    name: String!
    bio: String!
    url: String!
  }

  type Publisher {
    id: Int!
    name: String!
    url: String!
  }

  type Genre {
    id: Int!
    name: String!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
    publishers: [Publisher!]!
    genres: [Genre!]!
  }
`;

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
  listen: { port: 4000 },
})
  .then(({ url }) => {
    logger.info(`🚀  Server ready at: ${url}`);
  })
  .catch(logger.error);
