import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(PORT, () => {
  console.log(`Steady on http://localhost/${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.ejs");
});
