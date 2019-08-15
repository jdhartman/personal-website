$(document).ready(function() {

	var page = "";
	$(document).on('click', 'a', function(event){

		    $('html, body').animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 1000);
		    return false;
		});

	$(document).ready(function() {
		var unFixed = true;
	    $('.menu').scrollToFixed({
	    	marginTop: 30,
	    	fixed: function() { 
				console.log("Pre");
				$(".menu li").css("opacity", 0.1);
				unFixed = false;
				$(".menu li").hover(function() {
					console.log("hover", unFixed);
					if(!unFixed) {
						$(this).animate({opacity: 1.0}, 50);
					}
				}, function() {
					if(!unFixed) {
						$(this).animate({opacity: 0.1}, 50);
					}
				});  
	    	},
	    	postFixed: function() { 
				console.log("post", unFixed);
				$(".menu li").css("opacity", 1);
				unFixed = true;
			}
	    });
	});

	$( window ).resize(function() {

		var pageIds = ["#page1", "#projects", "#games", "#contact-text"];
		var pages = [];
		for(var i = 0; i < pageIds.length; i++) {
			var newPage = {};
			newPage["name"] = pageIds[i];
			newPage["top"] = $(pageIds[i]).offset().top - 500;
			newPage["bottom"] = newPage["top"] + $(pageIds[i]).outerHeight();
			if(window.width > 1024) {
				$(pageIds[i]).css({"opacity": 0});
			}
			else {
				$(pageIds[i]).css({"opacity": 1});
			}
			pages.push(newPage);
			console.log(pages[i]["name"], pages[i]);
		}
		if(window.width < 1800) {
			$(pageIds[3]).css({"opacity": 1});
		}
		console.log(window.width);
	  	if(window.width < 1024) {
			for(var i = 0; i < pageIds.length; i++) {
				$(pageIds[i]).css({"opacity": 1});
			}
		}
		if(window.width < 1800) {
			$(pageIds[3]).css({"opacity": 1});
		}
	});

	var pageIds = ["#page1", "#projects", "#games", "#contact-text"];
	var pages = [];
	for(var i = 0; i < pageIds.length; i++) {
		var newPage = {};
		newPage["name"] = pageIds[i];
		newPage["top"] = $(pageIds[i]).offset().top - 500;
		newPage["bottom"] = newPage["top"] + $(pageIds[i]).outerHeight();
		if(window.width > 1024) {
			$(pageIds[i]).css({"opacity": 0});
		}
		else {
			$(pageIds[i]).css({"opacity": 1});
		}
		pages.push(newPage);
		console.log(pages[i]["name"], pages[i]);
	}
	if(window.width < 1800) {
		$(pageIds[3]).css({"opacity": 1});
	}

	var pageNumber = -1;

	function testScroll(ev){
		if(window.width < 1024) {
			return;
		}
		if(window.pageYOffset < pages[0]["top"] && pageNumber > -1) {
			pageNumber = -1;
			for(var i = 0; i < pageIds.length; i++) {
				if(i !== 3 || window.width > 1800) {
					$(pageIds[i]).animate({opacity: 0});
				}
			}
		}

		for(var i = 0; i < pages.length; i++) {

			if(window.pageYOffset > pages[i]["top"] 
			&& window.pageYOffset < pages[i]["bottom"]
			&& pageNumber !== i) {
				if(pageNumber !== 3 || window.width > 1800) {
					$(pageIds[pageNumber]).animate({opacity: 0}, 1000, "swing")
				}
				pageNumber = i;
				console.log(pages[i]["name"], pages[i]);
				$(pageIds[i]).animate({opacity: 1}, 1000, "swing")
				
				break;
			}
		}
	}


	window.onscroll=testScroll
})