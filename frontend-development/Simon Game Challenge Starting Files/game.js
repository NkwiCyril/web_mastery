var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  return randomNumber;
}

var randomNumber = nextSequence(); // get the returned random number
var randomChosenColor = buttonColors[randomNumber]; // select color name from the random index
gamePattern.push(randomChosenColor); // add color to the game pattern array

function buttonBlink() {
  setTimeout(() => {
    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100);
  }, 100);
  playSound(randomChosenColor)
}

$("body").keydown(function () {
  var level = 1;
  var title = $("#level-title").text();

  while (true) {
    if (title == "Press A Key to Start") {
      $("#level-title").text(`Level ${level}`);
      buttonBlink();
    } else {
      level++;
      $("#level-title").text(`Level ${level}`);
    }
  }
});

function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  return audio.play();
}

function animatePress(currentColor) {
  // get currentColor of clicked button and add .pressed
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // select the current HTML element
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
});
