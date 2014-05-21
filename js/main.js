// main.js

$(function(){	
	


		$("#button").on("click", function(){
			event.preventDefault(event);

			if( !$("input:text").val() ){
				alert("Please enter a response.")
			} else {

				$(".verb_ing").empty().append($("input.verb_ing").val() );
				$(".adjective").empty().append($("input.adjective").val() );
				$(".sound").empty().append($("input.sound").val() );
				$(".noun").empty().append($("input.noun").val() );
				$(".man_noun").empty().append($("input.man_noun").val() );
				$(".adjective2").empty().append($("input.adjective2").val() );
				$(".verb").empty().append($("input.verb").val() );

				$("#form").fadeOut(400, function  () {
					$(":input").val("");
					$("#story").fadeIn(400);	
				});

				$("#play_again").on("click", function (event) {
					$("#story").fadeOut(400, function  () {
						$(":input").val("");
						$("#form").fadeIn(400);	
					});
				})

			};
		});









});