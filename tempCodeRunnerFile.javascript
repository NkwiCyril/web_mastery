var printName = (firstName) => {
  x = firstName.slice(0, 1).toUpperCase();
  y = firstName.slice(1).toLowerCase();

  return `Welcome, ${x + y}`;
};

console.log(printName("john"));
