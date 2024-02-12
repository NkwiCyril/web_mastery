import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    res.render("index2.ejs", {
      result: response.data
    });
  } catch (error) {
    res.render("index2.ejs", {
      user: JSON.stringify(error.response.data),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});
