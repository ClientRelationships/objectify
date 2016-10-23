export default class Dog {

  name: string;
  age: number;

  constructor (name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  toString (): string {
    return `Woof! I am ${this.age} years old`;
  }

}