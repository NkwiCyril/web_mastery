import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import notes from "../model/notes.js";

const app = express();
const PORT = process.env.API_PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Ready to go!");
});

// get all notes

app.get("/notes", (req, res) => {
  res.json(notes);
});

// get specific note

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  const foundNote = notes.find((note) => note.id === parseInt(id));
  if (notes.includes(foundNote)) {
    res.status(200).json(foundNote);
  } else {
    res.status(404).json({
      error: "Note not found",
    });
  }
});

// create or post a note

app.post("/notes", (req, res) => {
  const id = notes.length + 1;
  const category = req.body.category;
  const content = req.body.content;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  const newNote = {
    id: id,
    category: category,
    content: content,
    time: time,
    date: date,
  };
  notes.push(newNote);
  res.json(newNote);
});

// modify a note partially

app.patch("/notes/:id", (req, res) => {
  const id = req.params.id;
  const searchNote = notes.find((note) => note.id === parseInt(id));
  if (!searchNote)return res.status(404).json({message: "Unable to find note.",});

  if (req.body.category) searchNote.category = req.body.category;
  if (req.body.content) searchNote.content = req.body.content;

  res.status(200).json(searchNote);
});

// delete a note

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const searchIndex = notes.findIndex((note) => note.id === parseInt(id));
  if (notes.includes(notes[searchIndex])) {
    notes.splice(searchIndex, 1);
    res.status(200).json({
      message: "Note successfully deleted.",
      response: notes,
    });
  } else {
    res.status(404).json({
      message: "Unable to find note.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});

// send("Live on port " + PORT)
