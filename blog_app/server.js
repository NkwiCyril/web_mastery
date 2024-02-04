import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

var createdBlogs = [
  {
    title: "How to create your blog",
    content:
      "A blog (a truncation of is an informational website consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page.",
  },
];

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

app.get("/", (req, res) => {
  res.render("index.ejs", {
    blogs: createdBlogs,
    dateCreated: fullDate,
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/view", (req, res) => {
  console.log(createdBlogs);
  res.render("view.ejs", {
    blogs: createdBlogs,
  });
});

app.get("/edit", (req, res) => {
  res.render("create.ejs");
});

app.post("/", (req, res) => {
  createdBlogs.push(req.body);
  res.render("index.ejs", {
    blogs: createdBlogs,
    dateCreated: fullDate,
  });
});

app.delete("/delete/:id", (req, res) => {
   createdBlogs.splice(_id,)
})
app.listen(PORT, () => {
  console.log(`Steady on port http://localhost:${PORT}`);
});
