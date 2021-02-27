const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLError } = require('graphql');

let events = [];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  input ConcertInput {
    id: ID!
    name: String!
    minAgeRestriction: Int
    maxOccupancy: Int
    performingBand: String
  }

  input FestivalInput {
    id: ID!
    name: String!
    minAgeRestriction: Int
    maxOccupancy: Int
    performers: [String]
  }
  
  interface Event {
    id: ID!
    name : String!
    minAgeRestriction: Int
    maxOccupancy: Int
  }

  type Concert implements Event {
    id: ID!
    name: String!
    minAgeRestriction: Int
    maxOccupancy: Int
    performingBand: String
  }

  type Festival implements Event {
    id: ID!
    name: String!
    minAgeRestriction: Int
    maxOccupancy: Int
    performers: [String]
  }

  type Query {
    events(): [Event]
    eventByName(name: String!): [Event]
    findEventsForAdults(minAgeRestriction: Int!): [Event]
  }

  type Mutation {
    insertConcert(concert: ConcertInput): Concert
    insertFestival(festival: FestivalInput): Festival
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  events() {
    return events;
  },
  eventByName({ name }) {
    return events.filter(_event => _event.name === name);
  },
  findEventsForAdults() {
    return events.filter(_event => +_event.minAgeRestriction > 18);
  },
  insertConcert({ event }) {
    return (events = [...events, event]);
  },
};

const app = express();
app.use(
  '/events',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/events');
