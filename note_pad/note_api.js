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

// get all notes

app.get("/notes", (req, res) => {

});

// get specific note

app.get("/notes/:id", (req, res) => {

})

// create or post a note

app.post("/notes", (req, res) => {

});

// modify a note partially

app.patch("/notes/:id", (req, res) => {

});

// delete a note

app.delete("/notes/:id", (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});

// send("Live on port " + PORT)
