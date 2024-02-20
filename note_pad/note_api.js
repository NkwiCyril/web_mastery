import express from "express";
import notes from "./modules/notes.js";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.API_PORT;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Ready to go!");
});

app.listen(PORT, () => {
  console.log(`Steady on http:localhost:${PORT}`);
});

// send("Live on port " + PORT)
