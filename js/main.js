// main.js

$(document).ready(function(){	
	
	$('.get_search').submit(function(event){
		event.preventDefault(event);
		$('.results').html('');
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
var showData = function (result) {

	$('.searchDisplay').show('fast');

	var template = $(".searchDisplay").clone();

	var headline = template.find('.headline');
	headline.text(result.response.docs.headline);

	var abstract = template.find('.abstract');
	abstract.text(result.response.docs.abstract);

	var snippet = template.find('.snippet');
	abstract.text(result.response.docs.snippet);	

	var url = template.find('.url');
	abstract.text(result.response.docs.url);

	return result;
};


// THIS FUNCTION CALLS OUT TO THE NYT API, GETS DATA
var findSearch = function(search){

	var request = 	{tagged: search,
				 	site: 'New York Times',
					order: 'decs',
					sort: 'creation'};

	var result = $.ajax({
		url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + search + '&page=2&sort=oldest&api-key=a1eeb62c8df499298c449983e6967154:3:69423736',
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
			var data = showData(result);
			$('.searchDisplay').append(data);
		});
	})
	.fail(function() {
		console.log("error");
		$('.results').html('This feature is not working. :-(');
	})
	.always(function() {
		console.log("complete");
	});
	

};


















