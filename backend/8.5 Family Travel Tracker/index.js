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

var userId;

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
  const result = await db.query("SELECT * FROM users ORDER BY id ASC");

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

async function getUsername(userId) {
  const result = await db.query("SELECT name FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0].name;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "#94a3b8",
  });
});

// now to work adding a visited country for a specific family member
// make use of the members id; can include it as a param in the route endpoint
// All countries that are added need to have a user id since they are to be countries
// visited by famiy members
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
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, userId]
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
    userId = req.body["user"];
    const userCountries = await getUserCountries(userId);
    const userColor = await getUserColor(userId);
    const users = await getUsers();
    const username = await getUsername(userId);

    res.render("index.ejs", {
      countries: userCountries,
      total: userCountries.length,
      users: users,
      color: userColor,
      username: username,
    });
  }

  if (req.body["add"]) {
    res.render("new.ejs");
  }

  if (req.body["delete"]) {
    res.render("delete.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  if (!req.body["name"] || !req.body["color"]) {
    return res.status(505).send(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error: Missing Input Values</title>
        <link rel="stylesheet" href="/styles/styles.css">  </head>
      <body>
        <h1>Missing Input Values</h1>
        <p>Please go back and fill in all required fields (name and color) before submitting the form.</p>
      </body>
      </html>
    `
    );
  }

  try {
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [
      req.body["name"],
      req.body["color"],
    ]);
    res.redirect("/");
  } catch (error) {
    console.log("Encountered error: ", error);
  }
});

app.post("/delete", async (req, res) => {
  const name = req.body["username"];
  const id = await db.query("SELECT id FROM users WHERE name = $1", [name]);

  try {
    await db.query("DELETE FROM visited_countries WHERE user_id = $1", [
      id.rows[0]["id"],
    ]);
    await db.query("DELETE FROM users WHERE name = $1", [name]);
    res.redirect("/");
  } catch (error) {
    console.log("Encountered error: ", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
