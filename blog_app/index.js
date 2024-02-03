import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

var createdBlogs = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("index.ejs", {
    blogs: createdBlogs
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/view", (req, res) => {
  res.render("view.ejs");
})

app.get("/edit", (req, res) => {
  res.render("create.ejs");
})

app.post("/", (req, res) => {
  createdBlogs.push(req.body);
  res.render("index.ejs", {
    blogs: createdBlogs
  });
  
});

app.listen(PORT, () => {
  console.log(`Steady on port http://localhost:${PORT}`);
  console.log(createdBlogs)
});

