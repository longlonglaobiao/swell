$(document).ready(function () {
  sMulu();
});
$(window).resize(function () {
  sMulu();
});
var flag = 1;
$("#mulu").click(function () {
  console.log($(this));
  if (flag) {
    $(".biao-mulu").addClass("biao-mulu-left");
    $(".content-wrapper").css("background-color", "rgba(0,0,0,0.08)");
    flag = 0;
  } else {
    $(".biao-mulu").removeClass("biao-mulu-left");
    $(".content-wrapper").css("background-color", "rgba(0,0,0,0)");
    flag = 1;
  }
});
$(".content-wrapper").click(function () {
  $(".biao-mulu").removeClass("biao-mulu-left");
  $(this).css("background-color", "#f4f6f9");
  flag = 1;
});
$("#pushmenu").click(function () {
  $(".biao-mulu").removeClass("biao-mulu-left");
  flag = 1;
  return true;
});
function sMulu() {
  var w = $(window).innerWidth();
  if (w < 1200) {
    $(".biao-mulu").hide();
    $("#mulu").show();
  } else {
    $(".biao-mulu").show();
    $("#mulu").hide();
  }
}
