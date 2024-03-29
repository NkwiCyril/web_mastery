import express, { query } from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const db = new pg.Client({
  user: "postgres",
  database: "secrets",
  port: 5432,
  host: "localhost",
  password: process.env.PASSWORD,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  res.render("secrets.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body["username"];
  const password = req.body["password"];

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkUser.rows.length > 0) {
      res.send("username already exists");
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        password,
      ]);
      res.redirect("/secrets");
    }
  } catch (error) {
    console.log("Encountered error while trying to add user: ", error.message);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body["username"];
  const password = req.body["password"];

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkUser.rows.length > 0) {
      const user = checkUser.rows[0];
      const registeredPassword = user.password;
      password === registeredPassword
        ? setTimeout(() => {
            res.redirect("/secrets");
          }, 2000)
        : res.send("Invalid credentials!");
    } else {
      res.send("User does not exist. Please consider registering.")
    }
  } catch (error) {
    console.log("Encountered error while logging in: ", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
