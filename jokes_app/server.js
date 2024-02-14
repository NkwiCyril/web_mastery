import express from "express";
import axios from "axios";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  const category = req.body["category"];
  const type = req.body["type"];

  if (type === "single") {
    try {
      const response = await axios.get(API_URL + category + "?type=" + type);
      const data = response.data;
      res.render("joke.ejs", {
        type: type,
        result: data,
      });
    } catch (error) {
      error.message =
        "Error encountered in getting joke. Please try again later!";
      res.render("joke.ejs", {
        error: error.message,
      });
    }
  } else if (type === "twopart"){
		try {
      const response = await axios.get(API_URL + category + "?type=" + type);
      const data = response.data;
      res.render("joke.ejs", {
				type: type,
        result: data,
      });
    } catch (error) {
      error.message =
        "Error encountered in getting joke. Please try again later!";
      res.render("joke.ejs", {
        error: error.message,
      });
    }
	}
});

app.listen(PORT, () => {
  console.log(`Live on http://localhost:${PORT}`);
});
