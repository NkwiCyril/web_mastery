
// creating higher order functions

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

var calculator = (a, b, operator) => { // this is the high order function since it takes a function operator as parameter and returns its result
    return operator(a, b);
}

console.log(calculator(2,3,add));
console.log(calculator(2,3,subtract));
console.log(calculator(2,3,multiply));
console.log(calculator(2,3,divide));
// console.log(calculator(2,3,modulo));


