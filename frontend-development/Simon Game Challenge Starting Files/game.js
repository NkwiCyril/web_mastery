var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  setTimeout(() => {
    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColor);
  }, 1000);
  return Math.floor(Math.random() * 4);
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

var buttonColors = ["red", "blue", "green", "yellow"];

var randomNumber = nextSequence();

var randomChosenColor = buttonColors[randomNumber];

gamePattern.push(randomChosenColor);

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // select the current HTML element
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
});
