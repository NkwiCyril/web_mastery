import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Steady on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  // use the render() method in order to render dynamic files whose content may change like ejs files
  const day = new Date();
  const today = day.getDay();

  let dayT = "weekend.";
  let adv = "It's time to have some fun.";

  if (today === 6 || today === 0) {
    res.render(__dirname + "/views/index.ejs", {
      dayType: dayT,
      advice: adv,
    });
  }
  res.render(__dirname + "/views/index.ejs", {
    dayType: "weekday.",
    advice: "It's time to work harder.",
  });
});
