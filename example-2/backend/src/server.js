const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLError } = require('graphql');
const { Person } = require('./models/person.model');
const schema = require('./schema/person.schema');

let persons = [];

// Construct a schema, using GraphQL schema language

// The root provides a resolver function for each API endpoint
const root = {
  insertPerson({ person }) {
    persons = [...persons, new Person(person)];
    return persons;
  },
  findAll() {
    return persons;
  },
  findById({ id }) {
    const person = persons.filter(_person => +_person.id === +id);
    if (!person) {
      throw new GraphQLError('ERROR: No existe ninguna persona con este ID: ' + id);
    }
    return person;
  },
  findByName({ name }) {
    const person = persons.filter(_person => _person.name.includes(name));
    if (!person) {
      throw new GraphQLError('ERROR: No existe ninguna persona con este Nombre: ' + name);
    }
    return person;
  },
  findByAge({ age }) {
    const person = persons.filter(_person => +_person.age === +age);
    if (!person) {
      throw new GraphQLError('ERROR: No existe ninguna persona con esta edad: ' + age);
    }
    return person;
  },
  updatePerson({ id, person }) {
    const personToUpdate = persons.find(_person => +_person.id === +id);
    const found = {
      true: () => {
        Object.assign(personToUpdate, person);
      },
      false: () => {
        throw new GraphQLError('ERROR: Persona no encontrada');
      },
    };
    found[new Boolean(personToUpdate)]();
    return persons;
  },
  deletePerson({ id }) {
    const personsFiltered = persons.filter(person => person.id != id);
    persons = personsFiltered;
    return persons;
  },
};

const app = express();
app.use(cors());
app.use(
  '/persons',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/persons');
