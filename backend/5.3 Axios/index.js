import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  // get the users choosen type in order to filter
  const type = req.body["type"];
  const participants = req.body["participants"];

  try {
    const newResponse = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    var responseLength = newResponse.data.length; // get the length of the data gotten
    var randomIndex = Math.floor(Math.random() * responseLength)
    const result = newResponse.data[randomIndex]; // select a random activity
    res.render("index.ejs", { data: result });
  } catch (error) {
    // modify the error message rendered once no data is found
    error.message = "No activities that match your criteria."
    res.render("index.ejs", { error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
