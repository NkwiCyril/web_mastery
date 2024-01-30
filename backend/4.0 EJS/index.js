import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/info", (req, res) => {
  res.render(__dirname + "/views/index.ejs", {
    dayType: req.body["dayType"],
    advice: req.body["advice"],
  });
});
