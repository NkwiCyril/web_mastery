import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true })); // don't forget to add the middleware in order to get data from f-end

function checkCreds(req, res, next) {
  let username = req.body["username"];
  username == "NkwiCyril"
    ? alert("Welcome Sir")
    : alert("Incorrect credentials!");

  next();
}

app.use(checkCreds)

app.listen(port, () => {
  console.log(`Steady on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Nkwi</h1>");
});

app.get("/fan_page", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/credentials", (req, res) => {
  console.log(req.body);
  res.sendFile(__dirname + "/welcome.html")
});
