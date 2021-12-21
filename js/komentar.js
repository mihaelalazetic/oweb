	function postComment(n) {
		var cs = document.getElementById("previewbox" + n);
		var textarea = document.getElementById("comment" + n);
		var uname;
		if($("#uname").val()==""){
			uname="Guest";
		}else{
			uname=$("#uname").val();
		}
		if(textarea.value!=""){
			cs.innerHTML += "<p>" +uname+": " + textarea.value + "</p>";
			textarea.value = "";
			var br_kom=0;
			br_kom++;
			var val = parseInt($("#br-kom"+n).text(), 10);
			document.getElementById("br-kom"+n).innerHTML = val+br_kom;
		}
		
	}
	