import express from "express";
import bodyParser from "body-parser";
import tasks from "../modules/tasks.js";

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Task manager ready to go!!");
});

// get all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// get task by id
app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
  
  });

// get task by status [in_progress, todo, done]
app.get("/tasks/:status", (req, res) => {
  const status = req.params.status;
  
});


app.listen(PORT, () => {
  console.log(`API steady on http://localhost:${PORT}`);
});
