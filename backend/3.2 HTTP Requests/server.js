import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("successfully running!");
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome Sir.This is the server running</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>Hello, I am Nkwi Cyril. A full-stack developer</h1>")
})

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Me <br>+237 651085550</h1>")
})
