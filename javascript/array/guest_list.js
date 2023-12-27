var list = ["gill", "angel", "cyril"];
var main = prompt("What is your name please?");
if (list.includes(main)) {
  alert("You are welcome " + main);
} else {
  alert("Sorry. Your name is not in the list.");
}
