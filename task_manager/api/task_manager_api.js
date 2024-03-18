import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "task_manager",
  password: process.env.PASSWORD,
  port: 5432,
});

db.connect();

const tasks = await db.query("SELECT * FROM tasks");

app.get("/", (req, res) => {
  res.send("Task manager ready to go!!");
});

// get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks.rows);
});

// get task by id
app.get("/api/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (task.rows.length === 0) {
      res.json({ message: `Task with id ${id} not found!` });
    } else {
      res.json(task.rows);
    }
  } catch (error) {
    console.error(error.message);
  }
});

// filter tasks by status [in_progress, todo, done]
app.get("/api/filter", async (req, res) => {
  const { status } = req.query;

  // Check if the status parameter is missing or empty
  if (!status) {
    return res.status(400).json({ error: "Status parameter is required" });
  }

  try {
    const filteredTasks = await db.query(
      "SELECT * FROM tasks WHERE status = $1 GROUP BY id",
      [status]
    );

    res.status(200).json(filteredTasks.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// insert every username into the database
app.post("/api/users", async (req, res) => {
  const username = req.body.username;
  try {
    await db.query("INSERT INTO users (username) VALUES ($1)", [username]);
  } catch (error) {
    console.error("Error encountered while adding user: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create a task and insert into the database
app.post("/api/tasks", async (req, res) => {
  const { status, content } = req.body;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  if (!content || !status) {
    return res.status(500).json({ error: "Content and status are required." });
  }

  try {
    await db.query(
      "INSERT INTO tasks (content, status, created_time, created_date) VALUES ($1, $2, $3, $4)",
      [content, status, time, date]
    );
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update a task
app.patch("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await db.query("UPDATE tasks SET content=$1, status=$2 WHERE id=$3", [
      req.body.content,
      req.body.status,
      taskId,
    ]);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    await db.query("DELETE FROM tasks WHERE id=$1", [taskId]);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`API steady on http://localhost:${PORT}`);
});
