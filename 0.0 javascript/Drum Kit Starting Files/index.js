var handleClick = () => {
  alert("Thanks for the click!");
};

var btns = document.querySelectorAll(".drum"); // get length of elements with class of drum
console.log(btns[0]);
// using the for-each loop to add event listeners to all elements with class .drum
// btns.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     console.log(btn.innerHTML);
//     switch (btn.innerHTML) {
//       case "w":
//         var tom1 = new Audio("./sounds/tom-1.mp3");
//         tom1.play();
//         break;
//       case "a":
//         var tom2 = new Audio("./sounds/tom-2.mp3");
//         tom2.play();
//         break;
//       case "s":
//         var tom3 = new Audio("./sounds/tom-3.mp3");
//         tom3.play();

//         break;
//       case "d":
//         var tom4 = new Audio("./sounds/tom-4.mp3");
//         tom4.play();

//         break;
//       case "j":
//         var crash = new Audio("./sounds/crash.mp3");
//         crash.play();
//         break;
//       case "k":
//         var kBass = new Audio("./sounds/kick-bass.mp3");
//         kBass.play();

//         break;
//       case "l":
//         var snare = new Audio("./sounds/snare.mp3");
//         snare.play();
//         break;

//       default:
//         alert("Sounds not available at the moment.");
//         break;
//     }
//   });
// });

document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "w":
      var tom1 = new Audio("./sounds/tom-1.mp3");
      tom1.play();
      break;
    case "a":
      var tom2 = new Audio("./sounds/tom-2.mp3");
      tom2.play();
      break;
    case "s":
      var tom3 = new Audio("./sounds/tom-3.mp3");
      tom3.play();

      break;
    case "d":
      var tom4 = new Audio("./sounds/tom-4.mp3");
      tom4.play();

      break;
    case "j":
      var crash = new Audio("./sounds/crash.mp3");
      crash.play();
      break;
    case "k":
      var kBass = new Audio("./sounds/kick-bass.mp3");
      kBass.play();

      break;
    case "l":
      var snare = new Audio("./sounds/snare.mp3");
      snare.play();
      break;

    default:
      alert("Sounds not available at the moment.");
      break;
  }
});
