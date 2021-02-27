const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLError } = require('graphql');

class Person {
  constructor(person) {
    this.id = Person.incrementId();
    this.name = person.name;
    this.surnames = person.surnames;
    this.age = person.age;
  }

  static incrementId() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }
}

let persons = [];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input PersonInput {
    name: String!
    surnames: String!
    age: Int!
  }
  type Person {
    id: ID!
    name: String
    surnames: String
    age: Int
  }
  type Query {
    findAll: [Person]
    findById(id: Int!): [Person]
    findByName(name: String!): [Person]
    findByAge(age: Int!): [Person]
  }
  type Mutation {
    insertPerson(person: PersonInput): [Person]
    updatePerson(id: Int, person: PersonInput): [Person]
    deletePerson(id: Int): [Person]
  }
`);

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
