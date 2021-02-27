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
export default Person;
