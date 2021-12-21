$(function() {
    $( "#progressbar" ).progressbar({
      value: 0
    });
    
    $("form input").change(function() {
        var pbVal = 0;
        //For each input element, count the value on the data-pbVal element and add it to the total
        $("form input").each(function(index) {
            if($(this).val().length > 0) {
                pbVal += $(this).data('pbVal');
            }
        });
        $( "#progressbar" ).progressbar( "option", "value", pbVal );
            return false;
        });
});


