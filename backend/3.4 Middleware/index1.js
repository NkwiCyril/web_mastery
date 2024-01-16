import express from "express";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// get the current parent directory
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// middleware: used for interactions between the client and server-side
app.use(bodyParser.urlencoded({ extended: true }));

// send index.html file as response when at this endpoint(/)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let email = req.body;
  fs.writeFile("emails.txt", email+"\n", "utf-8", (err) => {
    if (err) throw err;
    console.log("email saved.");
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

