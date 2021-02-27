const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLError } = require('graphql');

let movies = [];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
   input MovieInput {
    title: String!
    year: Int!
    genre: Genre!
    director: DirectorInput
    actors: [ActorInput]
  }

  input ActorInput {
    name: String!
    lastname: String!
    age: Int
    interpretedMovies: [MovieInput]
  }

  input DirectorInput {
    name: String!
    lastname: String!
    age: Int
    directedMovies: [MovieInput]
  }

  enum Genre {
    ACTION
    COMEDY
    DRAMA
    HORROR
  }

  type Movie {
    title: String
    year: Int
    genre: Genre
    director: Director
    actors: [Actor]
  }

  interface Person {
    name: String
    lastname: String
    age: Int
  }

  type Director implements Person {
    name: String
    lastname: String
    age: Int
    directedMovies: [Movie]
  }

  type Actor implements Person {
    name: String
    lastname: String
    age: Int
    interpretedMovies: [Movie]
  }

  type Query {
    movie(title: String!): Movie
    movies: [Movie]
  }

  type Mutation {
    insertMovie(movie: MovieInput): [Movie]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  movie({ title }) {
    return movies.filter(_movie => +_movie.title === +title);
  },
  movies() {
    return movies;
  },
  insertMovie({ movie }) {
    return (movies = [...movies, movie]);
  },
};

const app = express();
app.use(
  '/movies',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/movies');
