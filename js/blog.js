$(document).ready(function(){
    $(".post").click(function(){
        var src=$("#blah").attr('src'),
        title=$("#naslov").val(),
        body=$("#text").val(),
        current = new Date(),
        time=current.toLocaleString(),
        link=$("#link").val(),
        usrname;
        if($("#uname").val()==""){
			usrname="Guest";
		}else{
			usrname=$("#uname").val();
		}

        if(title =="" || body =="" || link =="" || src==""){
            alert("Please fill in all of the text fields!");
        }
        else{
            $("#prv").after("<div class='square' id='new'></div>");
            $("#new").append("<span class='tr'><i class='fa fa-user'></i><span class='what'>"+usrname+"</span></span>"+
            '<a href="javascript:void(0);" class="delete"><i class="fa fa-trash"></i></a>'+
            "<img src='"+src+"' class='mask' width='520px'>"+
            '<div class="h1"> '+title+' </div>'+
            '<p>'+body+'</p>'+
            '<div><a href="'+link+'"class="button" target="_blank">Прочитај повеќе</a></div>'+
            '<p style="color: #919191; float: right;">'+time+'</p>');
        }
        $('#blah').attr('src',"");
        $("#naslov").val("");
        $("#text").val("");
        $("#link").val("https://www.");
        $("#file-upload").val("");

        $(document).on("click", ".delete" , function() {
            $(this).parent().remove();
        });

    });
});