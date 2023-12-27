function bottlesOnWall() {
  var i = 5;
  var bottleWord;

  while (i >= 1) {
    i === 1? (bottleWord = "bottle") : (bottleWord = "bottles");
    console.log(
      (i+1) +
        " " +
        bottleWord +
        " of beer on the wall," +
        (i+1)  +
        " " +
        bottleWord +
        " of beer.Take one down, take it around. " +
        (i) +
        " " + bottleWord + " of beer on the wall\n\n"
    );
    i--;
  }
}

bottlesOnWall();
