$(document).ready(function(){
    var br=12;
    $(".upload").click(function(){
        var src=$("#blah").attr("src"),
        caption=$("#naslov").val();
        br++;
        if(src==""){
            alert("Ne ste prikacile sklika!");
        } else{
            $("#up").after("<figure  id='novo"+br+"'></figure>");
            $("#novo"+br).append(
            '<img src="' + src + '">'+
            '<a href="javascript:void(0);" class="delete"><i class="fa fa-trash"></i></a>'+
            '<figcaption>' + caption + '</figcaption>'+
            '<span class="like" > 0 </span>'+
            '<a id="komentari"> <i class="fa fa-comment"></i><span id="br-kom12"> 0 </span></a><br>'+
            '<textarea name="comment" rows="2" cols="20" placeholder="Leave a comment here.." id="comment'+br+'"></textarea>'+
            '<div class="kopce-post"><button  class="btn btn-primary disabled"  onclick="postComment('+br+');" >Post</button></div>'+
            '<h4><i  class="fa fa-angle-down hide" style="cursor: pointer;"></i> Коментари</h4>'+
            '<div id="previewbox'+br+'"  class="kom"></div>');
        }
        $('#blah').attr('src',"");
        $("#naslov").val("");
        $("#file-upload").val("");
    });

    $(document).on("click", ".delete" , function() {
        $(this).parent().remove();
    });
});