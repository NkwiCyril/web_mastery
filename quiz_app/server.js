import express from "express";
import bodyParser from "body-parser";
import javascriptQuiz from "./modules/javascript_quiz.js";

const app = express();
const PORT = 5000;

const choosenAnswers = [];

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
  res.render("section1.ejs", {
    questions: firstSet,
  });
});

app.post("/section2", (req, res) => {
  // render section.ejs with the second set of questions
  var secondSet = javascriptQuiz.slice(5, javascriptQuiz.length);
  res.render("section2.ejs", {
    questions: secondSet,
  });

  choosenAnswers.push(req.body);
});

app.post("/results", (req, res) => {
  choosenAnswers.push(req.body);

  var setOneAnswers = Object.values(choosenAnswers[0]);
  var setTwoAnswers = Object.values(choosenAnswers[1]);

  var ansArray = [...setOneAnswers, ...setTwoAnswers];

  var count = 0;

  for (let i = 0; i < ansArray.length; i++) {
    if (ansArray[i] === javascriptQuiz[i]["options"][0]) {
      count++;
    }
  }

  res.render("result.ejs", {
    score: count,
  });

});
