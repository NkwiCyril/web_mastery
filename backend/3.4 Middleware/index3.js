import express from "express";

const app = express();
const port = 3000;

// custom middleware to log the method and URL of an http request
var logger = (req, res, next) => {
  console.log("Request method: "+req.method);
  console.log("Request URL: "+req.url);
  next();
};

// mounting the middleware with app.use()
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
