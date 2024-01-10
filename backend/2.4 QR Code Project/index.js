/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer"; // package used to get user input
import fs from "fs"; // package used for file manipulation
import qr from "qr-image"; // used to generate qr code images from strings

inquirer
  .prompt([ // get user input from the terminal
    {
      message: "What is the URL?",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("qr_code_image.png"));

    fs.writeFile("answers.txt", url, (err) => { // write url onto the answers.txt file
      if (err) throw err;
      console.log("Sucessfully written on to file");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });
