// interface !
// interface Human {
//   name: string,
//   gender: string,
//   age: number
// }

class Human {
  public name: string;
  private age: number;
  public gender: string;

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  getAge() {
    return this.age;
  }
}

const lynn = new Human('lynn', 22, 'female')

const sayHi = (person:Human):string => {
  return `Hello ${person.name}, are you ${person.getAge()} and declared as ${person.gender} !?`
}

console.log(sayHi(lynn))
