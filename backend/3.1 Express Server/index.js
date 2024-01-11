import express from "express";

const app = express();
const port = 1516;

app.listen(port, () => {
  console.log('First server running on port ' + port);
})
