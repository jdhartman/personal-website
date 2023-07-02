window.onscroll = function() {OnScroll()};

var sticky;

window.onload = function() {
	// Get the navbar
	var navbar = document.getElementById("navbar");

	sticky = navbar.offsetTop;

	var x = document.getElementById('description')
	var descriptions = ["Software Engineer", "Game Developer", "Web Designer", "Boilermaker"];
	var descLength = descriptions.length;
	var descIndex = 1;
	x.addEventListener("webkitAnimationIteration", function() {
		x.innerHTML = descriptions[descIndex++ % descLength];
	});
}

function OnScroll() {

	if (window.pageYOffset >= sticky) {
		navbar.classList.add("sticky")
	} else {
		navbar.classList.remove("sticky");
	}
}