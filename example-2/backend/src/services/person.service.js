const { Person } = require('../models/person.model');

let persons = [];

const insertPerson = ({ person }) => (persons = [...persons, new Person(person)]);
const deletePerson = ({ id }) => (persons = persons.filter(person => person.id != id));
const findAll = () => persons;

const findById = ({ id }) => {
  const person = persons.filter(_person => +_person.id === +id);
  if (!person) {
    throw new GraphQLError('ERROR: No existe ninguna persona con este ID: ' + id);
  }
  return person;
};

const findByName = ({ name }) => {
  const person = persons.filter(_person => _person.name.includes(name));
  if (!person) {
    throw new GraphQLError('ERROR: No existe ninguna persona con este Nombre: ' + name);
  }
  return person;
};

const findByAge = ({ age }) => {
  const person = persons.filter(_person => +_person.age === +age);
  if (!person) {
    throw new GraphQLError('ERROR: No existe ninguna persona con esta edad: ' + age);
  }
  return person;
};

const updatePerson = ({ id, person }) => {
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
};

const root = {
  insertPerson,
  findAll,
  findById,
  findByName,
  findByAge,
  updatePerson,
  deletePerson,
};

module.exports = root;
