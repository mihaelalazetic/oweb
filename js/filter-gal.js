$(document).ready(function(){
    $("#prebaraj").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("figure:has(figcaption)").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    }); 

    $("#search").click(function(){
      $("#s").animate({
        height: 'toggle',
        width: '171px',
        padding: '5px'
      });
    });
  }); 
