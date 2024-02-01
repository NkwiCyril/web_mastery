import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const firstName = req.body["fName"];
  const lastName = req.body["lName"];
  const jointName = [firstName, lastName].join('')
  
  var numOfCharacters = 0;

  for (let i = 0; i < jointName.length; i++) {
    if (jointName[i] != " ") {
      numOfCharacters++;
    }
  }

  res.render("index.ejs", {
    numChar: numOfCharacters
  })


});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
