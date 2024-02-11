import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const data = response.data;
    res.render("index.ejs", {
      data: data,
    });
  } catch (error) {
    console.error("Unable to process request!", error.message);
    res.render("index.ejs", { error: error });
  }
});

app.post("/", async (req, res) => {
  const type = req.body["type"];
  const participants = req.body["participants"];

  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    var responseLength = response.data.length;
    var randomIndex = Math.floor(Math.random() * responseLength);
    const result = response.data[randomIndex];

    res.render("index.ejs", {
      data: result,
    });
  } catch (error) {
    error.message = "Unable to process your request!";
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server steady on http://localhost:${PORT}`);
});
