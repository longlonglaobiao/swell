(function () {
  $(".biao-tree-title").click(function (event) {
    event.stopPropagation();

    if ($(this).find("i").hasClass("fa-plus-square-o")) {
      $(this)
        .find("i")
        .removeClass("fa-plus-square-o")
        .addClass("fa-minus-square-o");

      $(this).siblings().slideDown();
    } else {
      $(this)
        .find("i")
        .removeClass("fa-minus-square-o")
        .addClass("fa-plus-square-o");

      $(this).siblings().slideUp().find("ul").slideUp();
      $(this)
        .siblings()
        .find("i")
        .removeClass("fa-minus-square-o")
        .addClass("fa-plus-square-o");
    }
  });
})();
