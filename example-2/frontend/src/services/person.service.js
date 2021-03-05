class PersonService {
  persons = [];
  constructor() {}

  bindPersons = handler => (this.updatePersons = handler);

  _commit = persons => this.updatePersons(persons);

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

  add = ({ name, surnames, age }) => {
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          insertPerson(person: {name: "${name}", surnames: "${surnames}", age: ${age}}){
              id
              name
              surnames
              age
          }
        }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.insertPerson);
      })
      .catch(e => {
        console.error(e);
      });
  };

  delete = id => {
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation{
          deletePerson(id: ${id}){
              id
              name
              surnames
              age
          }
      }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.deletePerson);
      })
      .catch(e => {
        console.error(e);
      });
  };

  update = (id, { name, surnames, age }) => {
    fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          updatePerson(id:${id}, person: {name: "${name}", surnames: "${surnames}", age: ${age}}){
              id
              name
              surnames
              age
          }
      }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        this._commit(data.updatePerson);
      })
      .catch(e => {
        console.error(e);
      });
  };
}
