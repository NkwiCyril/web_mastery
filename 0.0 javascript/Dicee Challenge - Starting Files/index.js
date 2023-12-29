// get the h1 element
const result = document.querySelector("h1");

// get the dice images from the html document
const dice1 = document.querySelector(".img1");
const dice2 = document.querySelector(".img2");

//generate random whole number between 1 and 6
const n1 = Math.floor(Math.random() * 6 + 1);
const n2 = Math.floor(Math.random() * 6 + 1);

//now, to get the attributes
dice1.setAttribute("src", "./images/dice" + n1 + ".png");
dice2.setAttribute("src", "./images/dice" + n2 + ".png");

console.log(dice1.getAttribute("src"));
console.log(dice2.getAttribute("src"));

// comapare the values of n1 and n2 to see which player wins
n1 > n2
  ? (result.innerHTML = "🎲 Player One Wins")
  : n1 < n2
  ? (result.innerHTML = "Player Two Wins 🎲")
  : (result.innerHTML = "🎲 It's a draw 🎲");
