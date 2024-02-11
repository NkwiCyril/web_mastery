import express from "express";
import axios from "axios";
import 'dotenv/config'

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": process.env.APIKEY,
      },
    });
    const data = response.data;
    res.render("index.ejs", {
      result: data[0],
    });
  } catch (error) {
    console.error("Unable to generate quote!", error.message);
    error.message = "Unable to generate quote at the moment! Try again later!";
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
