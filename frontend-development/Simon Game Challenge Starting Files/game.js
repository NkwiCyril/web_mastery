var gamePattern = [];

var nextSequence = () => {
  return Math.floor(Math.random() * 4);
};

var buttonColors = ["red", "blue", "green", "yellow"];

var randomNumber = nextSequence();

var randomChosenColour = buttonColors[randomNumber];

gamePattern.push(randomChosenColour);
