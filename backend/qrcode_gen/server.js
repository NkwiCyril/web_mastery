import express from "express";
import inquire from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(5000, () => {

});

inquire
  .prompt([
    {
      message: "URL: ",
      name: "url",
    },
  ])
  .then((answers) => {
    const userURL = answers.url;
    var qr_png = qr.image(userURL);
    fs.writeFile("url.txt", userURL, (err) => {
      if (err) throw err;
      console.log("The file has been saved.");
    });
    qr_png.pipe(fs.createWriteStream("qr_image.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

app.get("/", (req, res) => {
  res.send("domain expansion_infinite void");
});

app.use(express.static(path.join(__dirname, 'qr_code')));

app.get("/image", (req, res) => {
  var htmlPath = path.join(__dirname, 'index.html');
  res.sendFile(htmlPath);
});
