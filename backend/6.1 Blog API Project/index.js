import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

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

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "8th Aug 2023",
  },
];

let lastId = 1;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Write your code here//

//CHALLENGE 1: GET All posts

app.get("/posts", (req, res) => {
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const foundPost = posts.find((post) => post.id === parseInt(id));
  res.json(foundPost);
});

//CHALLENGE 3: POST a new post

app.post("/posts", (req, res) => {
  const id = (lastId += 1);
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const date = fullDate;

  const newPost = {
    id: id,
    title: title,
    content: content,
    author: author,
    date: date,
  };

  posts.push(newPost);
  lastId = id;
  res.json(newPost);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPostIndex = posts.findIndex((Post) => Post.id === id);
  const foundPost = posts[foundPostIndex];

  if (posts.includes(foundPost)) {
    posts.splice(foundPostIndex, 1);
    res.status(200).json({
      message: "Post " + id + " successfully deleted!",
    });
  } else {
    res.status(404).json({
      message: "Post with id " + id + " not found!",
    });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
