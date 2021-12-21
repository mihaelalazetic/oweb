$(document).ready(function(){

  $(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#btn-back-to-top').fadeIn();
    } else {
        $('#btn-back-to-top').fadeOut();
    }
  });

  $("#btn-back-to-top").click(function () {
    $("html, body").animate({scrollTop: 0}, 100);
 });

});