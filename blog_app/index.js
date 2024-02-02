import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Steady on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
