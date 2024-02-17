import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;
const api_url = process.env.API_URL;
const api_key = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const config = {
  params: {
    key: api_key,
  },
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      api_url + "current.json?q=cameroon",
      config
    );
    const data = response.data;
    res.render("home.ejs", {
      response: data,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/", async (req, res) => {
  const country = req.body.country;

  try {
    const response = await axios.get(
      api_url + "current.json?q=" + country,
      config
    );
    const data = response.data;
    res.render("home.ejs", {
      response: data,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Steady of http://localhost:${port}`);
});
