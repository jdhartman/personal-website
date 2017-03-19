$(document).ready(function() {
    $('.menu').scrollToFixed({
    	marginTop: 30,
    	preFixed: function() { 
			    $("li").css("opacity", .1);

			    $("li").hover(function() {
			        $(this).animate({opacity: 1.0}, 50);
			    }, function() {
			        $(this).animate({opacity: 0.1}, 50);
			    });
    	},
    	postFixed: function() { $("li").css("opacity", 1);}
    });

});