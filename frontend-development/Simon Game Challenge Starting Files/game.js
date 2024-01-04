var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  return Math.floor(Math.random() * 4);
}

var randomNumber = nextSequence(); // get the returned random number
var randomChosenColor = buttonColors[randomNumber]; // select color name from the random index
gamePattern.push(randomChosenColor); // add color to the game pattern array

function buttonBlink() {
  setTimeout(() => {
    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100)
  }, 100);
}

$("body").keydown(function () {
  var level = 1;
  var title = $("#level-title").text();
  // console.log(hello);

  if (title == "Press A Key to Start") {
    $("#level-title").text("Level 1");
    buttonBlink();
  } else {
    $("#level-title").text(`Level ${++level}`);
    buttonBlink()
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
