import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  // password: "nkwicyril2002.",
  database: "world_map",
  port: 5432,
});

db.connect();

var codes = [];

db.query("select * from countries", (err, res) => {
  if (!err) {
    codes = res.rows;
    console.log(codes);
  } else {
    console.error(err.message);
  }
  db.end()
});

app.get("/", (req, res) => {
  //Write your code here.
  res.render("index.ejs", {
    total: codes.length,
    countries: codes,
  });
});

app.post("/add", (req, res) => {
  var selectedCountries = [];
  const selectedCountry = req.body.country;
  const foundCountry = codes.find(
    (country) => selectedCountry === country.country_name
  );
  selectedCountries.push(foundCountry.country_code);
  res.render("index.ejs", {
    countries: selectedCountries,
    total: codes.length
  })
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
