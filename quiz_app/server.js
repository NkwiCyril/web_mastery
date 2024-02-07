import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // make use of all static files in /public dir

app.listen(PORT, () => {
  console.log("Steady on http://localhost:" + PORT);
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/section1", (req, res) => {
  // render section.ejs with first set of questions
  var firstSet = javascriptQuiz.slice(0, 5);
  res.render("section.ejs", {
    questions: firstSet
  });
});

app.post("/section2", (req, res) => {
  // render section.ejs with the second set of questions
  var secondSet = javascriptQuiz.slice(5, javascriptQuiz.length);
  res.render("section.ejs", {
    questions: secondSet
  });
  console.log(req.body);
});

const javascriptQuiz = [
  {
    question: "1. What is the correct way to declare a variable in JavaScript?",
    options: ["let myVar;", "var myVar;", "variable myVar;", "const myVar;"],
  },
  {
    question: "2. How do you write an alert box in JavaScript?",
    options: [
      'alert("Hello World");',
      'msgBox("Hello World");',
      'alertBox("Hello World");',
      'msg("Hello World");',
    ],
  },
  {
    question:
      "3. Which method is used to add an element to the end of an array in JavaScript?",
    options: ["push()", "addToEnd()", "append()", "insertEnd()"],
  },
  {
    question: "4. What does the === operator do in JavaScript?",
    options: [
      "Checks for strict equality",
      "Checks for loose equality",
      "Assigns a value",
      "Performs addition",
    ],
  },
  {
    question: "5. How can you comment out a single line in JavaScript?",
    options: [
      "// Comment",
      "<!-- Comment -->",
      "/* Comment */",
      "** Comment **",
    ],
  },
  {
    question:
      "6. What is the difference between == and === operators in JavaScript?",
    options: [
      "`==` compares only value, `===` compares both value and type",
      "They perform the same type of comparison",
      "`==` compares both value and type, `===` compares only value",
      "There is no difference between them",
    ],
  },
  {
    question: "7. What is a closure in JavaScript?",
    options: [
      "A nested function that has access to its outer function's scope",
      "A function that takes another function as an argument",
      "A function that is defined inside an object",
      "A function that has no access to its outer scope",
    ],
  },
  {
    question: "8. How do you check if a variable is an array in JavaScript?",
    options: [
      "isArray(variable)",
      "variable.isArray()",
      "isArray(variable[])",
      "variable.isArray",
    ],
  },
  {
    question: "9. What is the purpose of the apply() method in JavaScript?",
    options: [
      "To call a function with a given `this` value and arguments provided as an array",
      "To apply styles to HTML elements",
      "To apply mathematical operations to numbers",
      "To apply regular expressions to strings",
    ],
  },
  {
    question: "10. What does the `this` keyword refer to in JavaScript?",
    options: [
      "It refers to the object that owns the function being executed",
      "It refers to the current function being executed",
      "It refers to the global object",
      "It refers to the parent function's scope",
    ],
  },
];
