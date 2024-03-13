import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "nkwicyril2002.",
  database: "world_map",
  port: 5432,
});

db.connect();

app.get("/", async (req, res) => {
  // get visited countries from the database
  // empty at first until countries are added in the /add route
  const visited_countries = await db.query("SELECT * FROM visited_countries");
  var countries = [];
  // extract country_codes of all visited countries and add to countries array
  visited_countries.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", {
    total: countries.length,
    countries: countries,
  });
});

// add a new country
app.post("/add", async (req, res) => {
  const selectedCountry = req.body.country;
  try {
    const country_codes = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [selectedCountry.toLowerCase()]
    );
    const countryCode = country_codes.rows[0].country_code;
    console.log(countryCode);
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, country_name) VALUES ($1, $2)",
        [countryCode, selectedCountry]
      );
      res.redirect("/");
    } catch (error) {
      console.log(error.message);
      const visited_countries = await db.query(
        "SELECT * FROM visited_countries"
      );
      var countries = [];
      visited_countries.rows.forEach((country) => {
        countries.push(country.country_code);
      });
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (error) {
    const visited_countries = await db.query("SELECT * FROM visited_countries");
    var countries = [];
    visited_countries.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist. Try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
