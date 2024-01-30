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
  // use the render() method in order to render dynamic files whose content may change like ejs files
  const day = new Date().getDay();
  if (day < 6 && day > 1) {
    res.render(__dirname + "/views/index.ejs", {
      dayType: "weekday.",
      advice: "It's time to work harder."
    });
  } else {
    res.render(__dirname + "/views/index.ejs", {
      dayType: "weekend.",
      advice: "It's time to have some fun."
    });
  }
});

