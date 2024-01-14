import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome Sir.This is the server running</h1>");
});

// setting up all endpoints
app.get("/about", (req, res) => { 
    res.send("<h1>Hello, I am Nkwi Cyril. A full-stack developer</h1>")
})

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Me <br>+237 651085550</h1>")
})

// listening for the available port available
app.listen(5000, () => {
  console.log("successfully running!");
});
