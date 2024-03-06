import express from "express";
import bodyParser from "body-parser";
import tasks from "../modules/tasks.js";

const app = express();
const PORT = 7000;

var len = tasks.length;
var lastId = tasks.lastIndexOf(tasks[len - 1]) + 1;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Task manager ready to go!!");
});

// get all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// get task by id
app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const foundById = tasks.find((task) => task.id === parseInt(id));
  (foundById == undefined)
    ? res.json({ message: "Task " + id + " not found " })
    : res.json(foundById)
});

// filter tasks by status [in_progress, todo, done]
app.get("/api/filter", (req, res) => {
  const { status } = req.query;
  const filteredTasks = tasks.filter((task) => task.status === status);

  res.status(200).json(filteredTasks);
});

// create a task
app.post("/api/tasks", (req, res) => {
  const createdTask = {
    id: (lastId += 1),
    content: req.body.content,
    status: req.body.status,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  };
  tasks.push(createdTask);
  if (tasks.includes(createdTask)) {
    res.status(200).json({ message: "Task added successfully!" });
  } else {
    res.status(404).json({ message: "Task could not be added. Try again!" });
  }
});

// edit a task
app.patch("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const searchTask = tasks.find((task) => task.id === parseInt(id));
  if (!searchTask)
    return res.status(404).json({ message: "Unable to find task." });

  if (req.body.content) searchTask.content = req.body.content;
  if (req.body.status) searchTask.status = req.body.status;

  res.status(200).json(searchTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const searchIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (tasks.includes(tasks[searchIndex])) {
    tasks.splice(searchIndex, 1);
    res.status(200).json({
      message: "task successfully deleted.",
      response: tasks,
    });
  } else {
    res.status(404).json({
      message: "Unable to find task.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API steady on http://localhost:${PORT}`);
});
