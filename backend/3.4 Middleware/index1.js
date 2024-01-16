import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

// get the current parent directory
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// send index.html file as response when at this endpoint(/)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
