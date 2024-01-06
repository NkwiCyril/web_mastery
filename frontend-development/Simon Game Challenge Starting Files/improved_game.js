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
  $(".btn").click(function () {
    var userChosenColor = $(this).attr("id"); // select the current HTML element
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
		if (checkAnswer(userClickedPattern, gamePattern)) {
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