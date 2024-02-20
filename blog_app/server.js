import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 5000;
const API_URL = "http://localhost:4000";

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
      heading: "Edit post",
      submit: "Update post",
      blog: data,
    });
  } catch (error) {
    res.json({
      message: "Unable to update post"
    })
  }
});

app.get("/create", (req, res) => {
  res.render("create.ejs", {
    heading: "Create blog",
    submit: "Post blog",
  });
});

app.get("/api/posts/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(API_URL + "/posts/" + id)
    res.redirect("/")
  } catch (error) {
    res.json({
      message: "Unable to delete post"
    })
  }
})

app.post("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(API_URL + "/posts/" + id);
    res.redirect("/");
  } catch (error) {
    res.json({
      message: "Unable to update post"
    })
  }
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
  } catch (error) {
    res.json({
      message: "Cannot get post."
    })
  }
});

app.listen(PORT, () => {
  console.log(`Steady on port http://localhost:${PORT}`);
});
