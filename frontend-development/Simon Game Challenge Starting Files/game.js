var gamePattern = [];

var nextSequence = () => {
  return Math.floor(Math.random() * 4);
};

var buttonColors = ["red", "blue", "green", "yellow"];

var randomNumber = nextSequence();

var randomChosenColor = buttonColors[randomNumber];

gamePattern.push(randomChosenColor);

setInterval(() => {
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio(`./sounds/${randomChosenColor}.mp3`);
  // audio.play();
}, 1500);

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // selec the current HTML element
  console.log(userChosenColor);
});
