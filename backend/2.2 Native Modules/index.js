const fs = require("fs");

var fileName = "firstNodeFile";

// fs.writeFile(
//   `${fileName}.txt`,
//   "This is my first file I have created with the node native module, fs",
//   (err) => {
//     if (err) throw err
//     console.log("Successfully wrote the file " + fileName );
//   }
// );

fs.readFile(
    "message.txt",
    'utf8', // specify the encoding else the raw buffer is returned
    (err, data) => {
        if (err) throw err
        console.log(data);
    }
)