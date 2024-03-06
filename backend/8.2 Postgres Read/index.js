import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const db = new pg.Client({
  user: "postgres",
  password: process.env.PASSWORD,
  database: "world_map",
  host: "localhost",
  port: 5432
})

const app = express();
const port = process.env.PORT;

let quiz = []

db.connect();
db.query("SELECT * FROM flags", (err, res) => {
  if(err) {
    console.error(err.message);
  } else {
    quiz = res.rows;
  }
})

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  await nextQuestion();
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
