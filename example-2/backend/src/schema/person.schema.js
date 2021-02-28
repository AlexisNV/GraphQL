const { buildSchema } = require('graphql');

const personInput = `
input PersonInput {
    name: String!
    surnames: String!
    age: Int!
  }
`;

const personType = `
type Person {
    id: ID!
    name: String
    surnames: String
    age: Int
  }
`;

const queryType = `
type Query {
    findAll: [Person]
    findById(id: Int!): [Person]
    findByName(name: String!): [Person]
    findByAge(age: Int!): [Person]
  }
`;

const mutationType = `
type Mutation {
    insertPerson(person: PersonInput): [Person]
    updatePerson(id: Int, person: PersonInput): [Person]
    deletePerson(id: Int): [Person]
  }
`;

const schema = `
${personInput}
${personType}
${queryType}
${mutationType}
`;

module.exports = buildSchema(schema);
