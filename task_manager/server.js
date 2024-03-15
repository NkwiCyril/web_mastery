import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.APP_PORT;
const API_URI = "http://localhost:7000/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var username = "";

app.get("/", (req, res) => {
  res.render("start.ejs");
});

app.post("/", async (req, res) => {
  username = req.body.username;
  try {
    await axios.post(API_URI + "api/users", req.body);
    res.redirect("/home");
  } catch (error) {
    console.error("Error posting data:", error.message);
    res.status(500).send("An error occurred while posting data to the server");
  }
});

// start.ejs
// get username from start.ejs and display here
// get tasks from api and send to client according to status
// render on index.ejs
app.get("/home", async (req, res) => {
  const todo = "todo";
  const inprogress = "inprogress";
  const done = "done";

  const name = username;
  try {
    const items_todo = await axios.get(API_URI + "api/filter?status=" + todo);
    const items_inprogress = await axios.get(
      API_URI + "api/filter?status=" + inprogress
    );
    const items_done = await axios.get(API_URI + "api/filter?status=" + done);

    res.status(200).render("index.ejs", {
      name: name,
      itemsTodo: items_todo.data,
      itemsInprogress: items_inprogress.data,
      itemsDone: items_done.data,
    });
  } catch (error) {
    res.status(404).send("Unable to get tasks.");
    console.error(error.message);
  }
});

// edit a specific task
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(API_URI + "api/tasks/" + id);
    res.render("edit.ejs", {
      task: response.data[0],
    });
  } catch (error) {
    res.status(404).send("Unable to get task.");
    console.error(error.message);
  }
});

// create a task and add to list of tasks
app.post("/add", async (req, res) => {
  try {
    await axios.post(API_URI + "api/tasks", req.body);
    res.redirect("/home");
  } catch (error) {
    console.error(error.message);
  }
});

// patch request in order to partially edit a task
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(API_URI + "api/tasks/" + id, req.body);
    res.redirect("/home");
  } catch (error) {
    res.status(409).send("Unable to update task. Go back and try again.");
    console.error(error.message);
  }
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(API_URI + "api/tasks/" + id);
    res.redirect("/home");
  } catch (error) {
    res.status(409).send("Unable to delete task. Go back and try again.");
    console.error(error.message);
  }
});

// change status of a task by click of a button corresponding to action
app.get("/pending/:id", async (req, res) => {
  try {
    await axios.patch(API_URI + "api/tasks/" + req.params.id, {
      status: "inprogress",
    });
    res.redirect("/home");
  } catch (error) {
    res
      .status(404)
      .send("Unable to change task status task. Go back and try again.");
    console.error(error.message);
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    await axios.patch(API_URI + "api/tasks/" + req.params.id, {
      status: "todo",
    });
    res.redirect("/home");
  } catch (error) {
    res
      .status(404)
      .send("Unable to change task status task. Go back and try again.");
    console.error(error.message);
  }
});

app.get("/done/:id", async (req, res) => {
  try {
    await axios.patch(API_URI + "api/tasks/" + req.params.id, {
      status: "done",
    });
    res.redirect("/home");
  } catch (error) {
    res
      .status(404)
      .send("Unable to change task status task. Go back and try again.");
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Application on http://localhost:${PORT}`);
});
