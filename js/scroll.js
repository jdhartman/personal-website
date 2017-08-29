$(document).ready(function() {

	$(document).on('click', 'a', function(event){

		    $('html, body').animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 1000);
		    return false;
		});

	$(document).ready(function() {
	    $('.menu').scrollToFixed({
	    	marginTop: 30,
	    	preFixed: function() { 
				    $(".menu li").css("opacity", 0.1);

				    $(".menu li").hover(function() {
				        $(this).animate({opacity: 1.0}, 50);
				    }, function() {
				        $(this).animate({opacity: 0.1}, 50);
				    });
	    	},
	    	postFixed: function() { $(".menu li").css("opacity", 1);}
	    });

	});
})