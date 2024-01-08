var gamePattern = []; // store random colors selected by comp
var userClickedPattern = []; // store pattern selected by user
var level = 0;
var score = Number($("#score span").text());
var highScore = Number($("#score p").text());

var started = false;
var buttonColors = ["red", "blue", "green", "yellow"]; // colors of the various buttons

function playSound(colorName) {
  let audio = new Audio(`./sounds/${colorName}.mp3`);
  return audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber]; // get color randomly
  gamePattern.push(randomChosenColor); // store random selected color in gamePattern list
  // console.log("game pattern: " + gamePattern);

  while (level < gamePattern.length) {
    // increase level number when nextSequence is called
    $("#level-title").text(`Level ${level + 1}`);
    level++;
  }

  playSound(randomChosenColor);
  setTimeout(() => {
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100); // blink button selected by computer
  }, 100);
}

function animatePress(currentColor) {
  // get currentColor of clicked button and add .pressed (check css file for style)
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$("body").keypress(function () {
  if (!started) {
    nextSequence();
		started = true;
  } 
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // select the current HTML element
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  // console.log("user pattern: " + userClickedPattern);
  playSound(userChosenColor);
  // get the last index of latest chosen color
  let latestChosenColor = userClickedPattern.lastIndexOf(userChosenColor);
  checkAnswer(latestChosenColor);
});

function checkAnswer(checkLevel) {
  console.log(checkLevel);
  if (userClickedPattern[checkLevel] === gamePattern[checkLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
      // increase user score sequence is gotten correctly
      score = score + 1;
      $("#score span").text(score);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    score > highScore
      ? $("#score p").text(score)
      : $("#score p").text(highScore);
    startOver();
  }
}

// restarted the game when user fails
function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
	score = 0;
	$('#score span').text(score);
	started = false;
}
