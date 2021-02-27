class PersonController {
  constructor(personService, personView) {
    this.personService = personService;
    this.personView = personView;

    this.personService.bindPersons(this.printPersons);

    this.personView.bindFindById(this.handlerFindById);
    this.personView.bindFindByName(this.handlerFindByName);
    this.personView.bindFindByAge(this.handlerFindByAge);
    this.personView.bindAddButton(this.handlerCreateItem);
    this.personView.bindDeleteButton(this.handlerDeleteItem);
    this.personView.bindUpdateButton(this.handlerUpdateItem);
    this.personService.findAll();
  }

  printPersons = persons => this.personView.refreshTable(persons);

  handlerFindById = id => this.personService.findById(id);

  handlerFindByName = name => this.personService.findByName(name);

  handlerFindByAge = age => this.personService.findByAge(age);

  handlerCreateItem = person => {
    this.personService.add(person);
  };

  handlerDeleteItem = id => {
    this.personService.delete(id);
  };

  handlerUpdateItem = (id, person) => {
    this.personService.update(id, person);
  };
}
