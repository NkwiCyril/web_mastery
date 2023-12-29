// using a constructor function

function BellBoy(name, age, hasWorkPermit, languages) {
  this.name = name;
  this.age = age;
  this.hasWorkPermit = hasWorkPermit;
  this.languages = languages;
}

// using a class

class BellBoyClass {
  constructor(name, age, hasWorkPermit, languages) {
    this.name = name;
    this.age = age;
    this.hasWorkPermit = hasWorkPermit;
    this.languages = languages;
  }
}

let bellBoy1 = new BellBoy("Timmy", 19, true, ["english", "spanish"]);
let bellBoy2 = new BellBoy(223, 22, false, "none");

console.log(bellBoy1);
console.log(bellBoy2);
