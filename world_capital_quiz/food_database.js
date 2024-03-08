import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "nkwicyril2002.",
  database: "world_map",
  port: 5432,
});

db.connect();

var food_data = [];
db.query("select * from world_food ", (err, res) => {
  if (!err) {
    food_data = res.rows;
    console.log(food_data);
  } else {
    console.error(err.message);
  }

  db.end();
});

app.get("/", (req, res) => {
  res.json(quiz);
});

app.listen(port, () => {
  console.log(`Server is running`);
});
