var gamePattern = []; // store random colors selected by comp
var userClickedPattern = []; // store pattern selected by user

var buttonColors = ["red", "blue", "green", "yellow"]; // colors of the various buttons

function playSound(colorName) {
  let audio = new Audio(`./sounds/${colorName}.mp3`);
  return audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber]; // get color randomly
  gamePattern.push(randomChosenColor); // store random selected color in gamePattern list
  console.log("updated game pattern: " + gamePattern);

  var level = 0;
  while (level < gamePattern.length) {
    $("#level-title").text(`Level ${level + 1}`);
    level++;
  }

  playSound(randomChosenColor);
  setTimeout(() => {
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  }, 100);
}

function animatePress(currentColor) {
  // get currentColor of clicked button and add .pressed
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$("body").keypress(function () {
  var title = $("#level-title").text();
  if (title == "Press A Key to Start") {
    nextSequence();
  }
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // select the current HTML element
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log("updated user pattern: " + userClickedPattern);
    playSound(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function checkAnswer(checkLevel) {
  console.log(checkLevel);

  if (userClickedPattern[checkLevel] === gamePattern[checkLevel]) {
    console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(() => {
				userClickedPattern = []
				nextSequence()
		} {
			alert('Incorrect sequence!')
		}
  });
});

function checkAnswer(a, b) {
  let lengthCompare = a.length === b.length;
  let elementCompare = a.every((element, index) => element === b[index]);
  return lengthCompare && elementCompare;
}