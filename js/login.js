$(document).ready(function(){
    $(document).on('click',".hide", function(){
        $(".kom").toggle();
    });

    $("#login").click(function(){
        $("#uname").animate({
          height: 'toggle',
          width: '150px',
          padding: '5px'
        },"fast");
      });
});