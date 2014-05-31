// main.js

var paragraphSelect

$(document).ready(function(){	
	
	$(document).on('click', '.headline', function (event) {
		 event.preventDefault(event);
		$(this).siblings('#show_paragraph').toggle();
	});

	$(document).on('click', '#use', function (event) {
		var para = $(this).siblings('.paragraph');
		var already = $('#paragraph_story .paragraph');
		var paragraphSelect;
		console.log(para);

		event.preventDefault(event);
		para.clone().appendTo('#paragraph_story');
		already.first().remove();
		
		var split = para.innerText.split(" ");
		console.log(split);

		$('#search').fadeOut('slow', function() {
			$(this).hide();	
		});

		$('#story').fadeIn('slow', function() {

		});

	});


	$('.get_search').submit(function(event){
		event.preventDefault(event);
		var search = $(this).find("input[name='search']").val();
		console.log(search);
		findSearch(search);
	});

		// GETTING MAD LIPS POS FROM USER
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

//GETTING JSON DATA TO APPEAR IN HTML
var showSearchData = function (query, resultsNum) {
	var results = '<p> <u>' + resultsNum + '</u>  results for <strong>' + query + '</p>';
	$('.info').html(results);
	return results;
};

//DISPLAY THE DATA FROM THE JSON ARRAY IN THE HTML
var showData = function (i, result) {

	$('#searchDisplay').show();
	$('#show_paragraph').hide();

	var template = $("#searchDisplay").clone();

	var headline = template.find('.headline');
	headline.text(result.headline.main);
	headline.addClass('count_' + i);

	var paragraph = template.find('.paragraph');
	paragraph.text(result.lead_paragraph);

	return template;
	
};


// THIS FUNCTION CALLS OUT TO THE NYT API, GETS DATA
var findSearch = function(search){

	var request = 	{tagged: search,
				 	site: 'New York Times',
					order: 'decs',
					sort: 'creation'};

	var result = $.ajax({
		url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + search + '&fq=source.contains("abstract")&fq=document_type:("article")&fq=word_count("1000")&page=0&sort=oldest&api-key=a1eeb62c8df499298c449983e6967154:3:69423736',
		type: 'GET',
		dataType: 'json',
		data: search,
	})
	.done(function(result) {
		console.log("success");
		console.log(result);
		var searchResults = showSearchData(request.tagged, result.response.docs.length );
		$('.info').html(searchResults);

		$.each(result.response.docs, function(i, item) {
				var data = showData(i, item);
				$('.results').append(data);
		});
		$('.results').removeClass('hidden');
		$('#searchDisplay').first().remove();

	}).fail(function() {
		console.log("error");
		$('.results').html('This feature is not working. :-(');
	});
	
};

















