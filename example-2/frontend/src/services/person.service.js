class PersonService {
  persons = [];
  constructor() { }

  bindPersons = handler => (this.printTable = handler);

  _commit = persons => this.printTable(persons);

  findAll = () => {
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: `{ findAll{ id, name, surnames, age} }` }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.findAll);
      });
  };

  findById = id => {
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ findById(id: ${+id}){ id, name, surnames, age} }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.findById);
      })
      .catch(e => {
        console.error(e);
      });
  };

  findByName = name => {
    console.log(name);
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ findByName(name: "${name}"){ id, name, surnames, age} }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.findByName);
      })
      .catch(e => {
        console.error(e);
      });
  };

  findByAge = age => {
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ findByAge(age: ${+age}){ id, name, surnames, age} }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.findByAge);
      })
      .catch(e => {
        console.error(e);
      });
  };

  add = person =>
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        mutation: `{ insertPerson(person: {name: ${person.name}, surnames: ${person.surnames}, age: ${+person.age}}){ id, name, surnames, age }}`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => this._commit(data.insertPerson))
      .catch(e => {
        console.error(e);
      });
}