function fibonacciGenerator(n) {
  //Do NOT change any of the code above 👆

  //Write your code here:

  var fib = [0, 1];
  if (n === 1) {
    fib = [fib[0]];
  } else if (n === 2) {
    fib = [fib[0], fib[1]];
  } else {
    for (let i = 0; i < n - 2; i++) {
      fib.push(fib[i] + fib[i + 1]);
    }
  }

  return fib;

  //Return an array of fibonacci numbers starting from 0.

  //Do NOT change any of the code below 👇
}

console.log(fibonacciGenerator(4));
