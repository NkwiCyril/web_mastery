import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";


const app = express();
const port = process.env.PORT;
var quiz = [];

const db = new pg.Client({
  password: process.env.PASSWORD,
  host: "localhost",
  database: "world_map",
  user: "postgres",
  port: 5432, // default port number
});

db.connect();

db.query("SELECT * from capitals", (err, res) => {
  if (err) {
    console.error("Unable to get data: ", err.stack);
  } else {
    // respond with the quiz object
    quiz = res.rows;
  }
  db.end();
});

// quiz object
// let quiz = [
//   { country: "France", capital: "Paris" },
//   { country: "United Kingdom", capital: "London" },
//   { country: "United States of America", capital: "New York" },
// ];

// holds number of correctly answered questions
let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
