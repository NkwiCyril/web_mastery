$("#about").hover(
  function () {
    // over
    $("span.lang").addClass("position");
  },
  function () {
    // out
    $("span.lang").removeClass("position");
  }
);

