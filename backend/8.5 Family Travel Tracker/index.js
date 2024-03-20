import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "world_map",
  port: 5432,
});

db.connect();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// get country codes of all countries visited by family members
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// get all users from database
async function getUsers() {
  const result = await db.query("SELECT * FROM users");

  return result.rows;
}

// get all country codes for particular family members
async function getUserCountries(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON user_id = users.id WHERE users.id = $1",
    [userId]
  );
  let userCountries = [];
  result.rows.forEach((country) => {
    userCountries.push(country.country_code);
  });
  return userCountries;
}

// get user's color
async function getUserColor(userId) {
  const result = await db.query("SELECT color FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0].color;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getUsers();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
  // res.render("new.ejs")
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if (req.body["user"]) {
    const input = req.body["user"];
    const userCountries = await getUserCountries(input);
    const userColor = await getUserColor(input);
    const users = await getUsers();

    res.render("index.ejs", {
      countries: userCountries,
      total: userCountries.length,
      users: users,
      color: userColor,
    });
  } else if (req.body["add"]) {
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  if (!req.body["name"] || !req.body["color"]) {
    return res
      .status(505)
      .send(
        "<h1>Please input all values before proceeding. Go back and try again.</h1>"
      );
  }

  try {
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [
      req.body["name"],
      req.body["color"],
    ]);
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
