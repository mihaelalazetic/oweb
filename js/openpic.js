$(document).ready(function(){

    $(document).on("click","img",function() {
        
        var $src = $(this).attr('src');

        $(".popup-overlay, .popup-content").addClass("active");
        $(".popup-content").html("<img src='"+$src+"'>")

        $(".close, .popup-overlay").click(function() {
            $(".popup-overlay, .popup-content").removeClass("active");
        });
    
    });
});
