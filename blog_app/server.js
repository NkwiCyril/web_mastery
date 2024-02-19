import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 5000;
const API_URL = "http://localhost:4000";

var months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

var date = new Date().getDate();
var month = new Date().getMonth();
var year = new Date().getFullYear();

var fullDate = "";

if (date.toString().endsWith("1")) {
  fullDate = date + "st " + months[month] + " " + year;
} else if (date.toString().endsWith("2")) {
  fullDate = date + "nd " + months[month] + " " + year;
} else if (date.toString().endsWith("3")) {
  fullDate = date + "rd " + months[month] + " " + year;
} else {
  fullDate = date + "th " + months[month] + " " + year;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/posts");
    const data = response.data;
    res.render("index.ejs", {
      blogs: data,
    });
  } catch (error) {
    res.status(404).send("Unable to get resource.");
  }
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(API_URL + "/posts/" + id);
    const data = response.data;
    res.render("create.ejs", {
      submit: "Update post",
      blog: data,
    });
  } catch (error) {}
});

app.get("/create", (req, res) => {
  res.render("create.ejs", {
    submit: "Post blog",
  });
});

app.post("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(API_URL + "/posts/" + id);
    res.redirect("/");
  } catch (error) {}
});

app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(API_URL + "/posts", req.body);
    res.redirect("/");
  } catch (error) {}
});

app.get("/view/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(API_URL + "/posts/" + id);
    const data = response.data;
    res.render("view.ejs", {
      blog: data,
    });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Steady on port http://localhost:${PORT}`);
});
