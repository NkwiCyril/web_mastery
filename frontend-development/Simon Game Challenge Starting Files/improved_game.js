var gamePattern = []; // store random colors selected by comp
var userPattern = []; // store pattern selected by user

var buttonColors = ["red", "blue", "green", "yellow"]; // colors of the various buttons

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * (buttonColors.length + 1));
  let randomChosenColor = buttonColors[randomNumber]; // get color randomly
  gamePattern.push(randomChosenColor); // store random selected color in gamePattern list

	var level = 0;
	while (level < gamePattern.length) {
		$("#level-title").text(`Level ${level + 1}`);
		level++;
	}


  playSound(randomChosenColor);
  setTimeout(() => {
    $(`#${randomChosenColor}`)
      .fadeOut(100)
      .fadeIn(100);
  }, 100);
}

    let randomNumber = nextSequence(); // store returned random number
    let randomChosenColor = buttonColors[randomNumber]; // get color randomly
    
    gamePattern.push(randomChosenColor); // store random selected color in gamePattern list

$("body").keypress(function () {
    
  var title = $("#level-title").text();
  if (title == "Press A Key to Start") {
    nextSequence();
  }
});

function checkAnswer(a, b) {
  let lengthCompare = a.length === b.length;
  let elementCompare = a.every((element, index) => element === b[index]);
  return lengthCompare && elementCompare;
}