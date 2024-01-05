var gamePattern = []; // store random colors selected by comp
var userPattern = []; // store pattern selected by user

var buttonColors = ["red", "blue", "green", "yellow"]; // colors of the various buttons

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * (buttonColors.length + 1));
  let randomChosenColor = buttonColors[randomNumber]; // get color randomly
  gamePattern.push(randomChosenColor); // store random selected color in gamePattern list

$("body").keypress(function (e) {
  while (true) {

    let randomNumber = nextSequence(); // store returned random number
    let randomChosenColor = buttonColors[randomNumber]; // get color randomly
    
    gamePattern.push(randomChosenColor); // store random selected color in gamePattern list

$("body").keypress(function () {
    
  var title = $("#level-title").text();
  if (title == "Press A Key to Start") {
    nextSequence();
  }
});
