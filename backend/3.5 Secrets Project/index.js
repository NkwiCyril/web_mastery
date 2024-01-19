//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const app = express();
const port = 5000;
var authorized = false;

app.use(bodyParser.urlencoded({ extended: true })); // make use of the imported middleware

var passwordParser = (req, res, next) => {
  const password = req.body["password"];
  if (password == "ILoveProgramming.") authorized = true; // check if password is the correct password in order to access secret file
  next();
};

app.use(passwordParser);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // display file from its location
});

app.post("/check", (req, res) => {
  if (authorized) {
    // check if password is the correct password in order to access secret file
    setInterval(() => {
      res.sendFile(__dirname + "/public/secret.html");
    }, 2000); // delay for some time before displaying the secret file
  } else {
    res.sendFile(__dirname + "/public/index.html")
  }
});

app.listen(port, () => {
  console.log(`Steady on port ${port}`);
});
