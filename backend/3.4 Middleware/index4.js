import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;
var bandName = "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var bandNameGenerator = (req, res, next) => {
  bandName = req.body["street"] + req.body["pet"];
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bandNameGenerator)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(
    "<h1>Hello server!</h1>\n<h1>Your bandname is " + bandName + "</h1>"
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
