class PersonView {
  constructor() {
    this.$table = document.getElementById('find-table');
    this.$tablebody = document.getElementById('table-body');

    this.$updateid = document.getElementById('update-id');
    this.$addname = document.getElementById('add-name');
    this.$addsurnames = document.getElementById('add-surnames');
    this.$addage = document.getElementById('add-age');
    this.$addbtn = document.getElementById('add-btn');

    this.$findtext = document.getElementById('find-text');

    this.$findidbtn = document.getElementById('find-id-btn');
    this.$findnamebtn = document.getElementById('find-name-btn');
    this.$findsurnamesbtn = document.getElementById('find-surnames-btn');
    this.$findagebtn = document.getElementById('find-age-btn');

    this.deleteHandler;
    this.updateHandler;
  }

  refreshTable = persons => {
    console.log(persons);
    const tablebody = this.$tablebody;
    tablebody.innerHTML = '';
    if (!Array.isArray(persons)) {
      persons = [persons];
    }
    persons.forEach(person => {
      let newRow = document.createElement('tr');
      newRow.innerHTML = `<td>${person.id}</td><td>${person.name}</td><td>${person.surnames}</td><td>${person.age}</td>`;

      let tdDelete = document.createElement('td');
      const btnDelete = document.createElement('button');
      btnDelete.innerText = 'Borrar';
      btnDelete.addEventListener('click', e => this.deleteHandler(person.id));
      tdDelete.appendChild(btnDelete);
      newRow.appendChild(tdDelete);

      let tdUpdate = document.createElement('td');
      const btnUpdate = document.createElement('button');
      btnUpdate.innerText = 'Actualizar';
      btnUpdate.addEventListener('click', e => {
        this.$updateid.value = person.id;
        this.$addname.value = person.name;
        this.$addsurnames.value = person.surnames;
        this.$addage.value = person.age;
      });
      tdUpdate.appendChild(btnUpdate);
      newRow.appendChild(tdUpdate);

      tablebody.appendChild(newRow);
    });
  };

  getPersonItem = () => {
    const name = this.$addname.value;
    const surnames = this.$addsurnames.value;
    const age = +this.$addage.value;
    const person = new Person({ name, surnames, age });
    return person;
  };

  bindFindById(handler) {
    this.$findidbtn.addEventListener('click', () => {
      handler(this.$findtext.value);
    });
  }

  bindFindByName(handler) {
    this.$findnamebtn.addEventListener('click', () => {
      handler(this.$findtext.value);
    });
  }

  bindFindByAge(handler) {
    this.$findagebtn.addEventListener('click', () => {
      handler(this.$findtext.value);
    });
  }

  bindAddButton(handler) {
    this.$addbtn.addEventListener('click', () => {
      const person = this.getPersonItem();
      if (this.$updateid.value === '') {
        console.log('añadir');
        handler(person);
      } else {
        console.log('actualizar');
        this.updateHandler(this.$updateid.value, person);
      }
      this.$updateid.value = '';
      this.$addname.value = '';
      this.$addsurnames.value = '';
      this.$addage.value = '';
    });
  }

  bindDeleteButton(handler) {
    this.deleteHandler = handler;
  }

  bindUpdateButton(handler) {
    this.updateHandler = handler;
  }
}
