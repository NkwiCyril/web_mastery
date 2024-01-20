import express from "express";

const app = express();

const PORT = 3000;

app.listen("/", (req, res) => {
  console.log("steady on port 3000");
});
