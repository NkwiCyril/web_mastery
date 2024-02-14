const btn = document.querySelector(".new-joke");
const setCat = document.querySelector(".set-category");

btn.addEventListener("click", () => {
  location.reload();
});

setCat.addEventListener("click", () => {
  window.history.back();
});
