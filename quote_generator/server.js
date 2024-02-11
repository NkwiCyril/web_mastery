import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": "K3kUreu8JFAzTqRVgkHzRg==xbofAZNXJl68GdcW",
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
