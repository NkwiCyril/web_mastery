import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const userSecret = response.data.secret;
    const username = response.data.username;
    res.render("index.ejs", {
      secret: userSecret,
      user: username,
    });
  } catch (error) {
    res.render("index.ejs", {
      user: JSON.stringify(error.response.data),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});
