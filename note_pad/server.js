import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.APP_PORT;
const API_URL = "http://localhost:7000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/notes");
    res.render("index.ejs", {
      notes: response.data,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(API_URL + "/notes/" + id);
    res.render("edit.ejs", {
      note: response.data,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/api/notes", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(API_URL + "/notes", req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(API_URL + "/notes/" + id, req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/api/notes/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await axios.delete(API_URL + "/notes/" + id);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});
