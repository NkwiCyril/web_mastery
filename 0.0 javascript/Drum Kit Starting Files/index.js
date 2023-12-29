var handleClick = () => {
  alert("Thanks for the click!");
};

const btnLength = document.querySelectorAll(".drum").length; // get length of elements with class of drum

for (let i = 0; i < btnLength; i++) {
  // loop through the buttons list and apply the event listener to each of them
  let btn = document.querySelectorAll(".drum")[i];
  btn.addEventListener("click", handleClick);
}
