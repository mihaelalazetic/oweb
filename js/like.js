$(document).ready(function(){
  $(document).on('click','.like',function() {
    var val = parseInt($(this).text(), 10);
    $(this).toggleClass('is-liked');
    
    if ($(this).hasClass('is-liked')) {
      val++;
      $(this).css("color","red");
  
    } else {
      val--;
      $(this).css("color","rgb(117, 117, 117)");
    }
    $(this).text(val);
  });
  
});