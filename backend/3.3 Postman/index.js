import express from "express";
const app = express();
const port = 3000;

// *********************
// Let’s practice using Postman. Make sure your server is running with nodemon.
// Then test the 5 different routes below with Postman. Open a separate tab for each request.
// Check that for each route you’re getting the correct status code returned to you from your server.
// You should not get any 404s or 500 status codes.
// *********************

// only used to retrieve data from the server in which it is hosted (no modification is done on the data)
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// used to send data to the server for processing. 
// usually changes the state of the server and other side effects
app.post("/register", (req, res) => {
  //Do something with the data
  res.sendStatus(201);
});

// updates a current resource or create it if it does not exist, 
// the client is the one that provides the complete and updated copy of the resource
app.put("/user/cyril", (req, res) => {
  res.sendStatus(200);
});

// updates parts of an existing resource
// client provides the parts of the resource that need updating
app.patch("/user/cyril", (req, res) => {
  res.sendStatus(299);
});

// removes specified resource from the server
app.delete("/user/cyril", (req, res) => {
  //Deleting
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
