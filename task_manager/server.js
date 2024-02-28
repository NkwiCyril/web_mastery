import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("start.ejs");
});

// get username from start.ejs and display here
app.post("/", (req, res) => {
  const username = req.body.username;
//   setTimeout(() => {}, 2000);
  res.render("index.ejs", {
    name: username,
  });
});

app.listen(PORT, () => {
  console.log(`Application on http://localhost:${PORT}`);
});
