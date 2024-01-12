import express from "express";

const app  = new express();

const port = 5000;

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});

app.get("/data",(req, res) => {

    res.send("<h1>Welcome! Your server is successfully running.</h1>")

})