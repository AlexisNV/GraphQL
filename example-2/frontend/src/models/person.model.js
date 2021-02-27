class Person {
  constructor({ name, surnames, age }) {
    this.name = name;
    this.surnames = surnames;
    this.age = age;
  }

  get name() {
    return this._name;
  }

  set name(newname) {
    if (!/^[a-zA-Z\s]{2,50}$/.test(newname)) {
      throw new Error('ERROR: Formato de Nombre inválido');
    }
    this._name = newname;
  }

  get surnames() {
    return this._surnames;
  }

  set surnames(newsurnames) {
    if (!/^[a-zA-Z\s]{2,80}$/.test(newsurnames)) {
      throw new Error('ERROR: Formato de Apellidos inválido');
    }
    this._surnames = newsurnames;
  }

  get age() {
    return this._age;
  }

  set age(newage) {
    if (!/^[0-9]{1,3}$/.test(newage)) {
      throw new Error('ERROR: Formato de Edad inválido');
    }
    this._age = newage;
  }
}
