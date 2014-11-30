// JS CODE FOR THA RESUME

var headerBack = document.getElementById("headerback");
var headerWrap = document.getElementById("headerwrapper");
var toTop = document.getElementById("totop");

window.addEventListener("scroll", function resizeHeader() {
	if (pageYOffset <= 0) {
		headerBack.style.height = 100 + "px";
		headerWrap.style.top = 25 + "px";
	} else if ((pageYOffset < 101) && (pageYOffset > 0)) {
		headerBack.style.height = (100 - (pageYOffset / 2)) + "px";
		headerWrap.style.top = (25 - (pageYOffset / 4)) + "px";
	} else if (pageYOffset >= 101) {
		headerBack.style.height = 50 + "px";
		headerWrap.style.top = 0 + "px";
	}
})

window.addEventListener("scroll", function toTopVisible() {
	if (pageYOffset < 300) {
		toTop.style.opacity = 0;
		toTop.style.cursor = "default";
		toTop.onclick = function() {return false;};
	} else if (pageYOffset >= 300) {
		toTop.style.opacity = 0.8;
		toTop.style.bottom = 50 + "px";
		toTop.style.cursor = "auto";
		toTop.onclick = function() {return true;};
	}
})


























