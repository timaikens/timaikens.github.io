/* JS FOR COACH TEST */





/* My own function that I use to make arrays of elements with a given class. Cleans up getElementsByClassName method a bit and ensures that only element nodes are included. */
function pareArray(clsNm) {
	var aAll = document.getElementsByClassName(clsNm),
		aAbbr = [];
	for(var i=0,l=aAll.length;i<l;i++) {if(aAll[i].nodeType == 1) {aAbbr.push(aAll[i]);}}
	return aAbbr;
}

/* For browser detection. Lifted from http://stackoverflow.com/a/2401861 */

navigator.browserInfo = (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M;
})();

var browserName = navigator.browserInfo[0];

/* ----------------------------------------------------------------------*/









/* CAROUSEL FUNCTIONS */


var slides = pareArray("slide"),
	dots = pareArray("dot"),
	leftArrow = document.getElementById("change-slide-left"),
	rightArrow = document.getElementById("change-slide-right"),
	numSlides = slides.length,
	halfNum = (slides.length / 2) - 0.5,
	activeIndex = 0,
	/* Change these to whatever common classes are used for ALL slides & dots */
	baseSlideClassName = "slide",
	baseDotClassName = "dot td3",
	autoChangeSlides,
	restartAutoSlidesTimeout,
	restart,
	frequency = 3500,
	delay = 2500;

function changeSlides(targetIndex) {

		// for autoplay (no arguments)
		if(arguments.length === 0) {targetIndex = activeIndex + 1;restart = false;}
		else {restart = true;}

		function getInRange(n) {
			if(n < 0) {n = n + numSlides;}
			else if(n >= numSlides) {n = n - numSlides;}
			return n;
		}
		targetIndex = getInRange(targetIndex);

		// This bit to avoid "flicker" of other slides moving in the background
		for(var k = 0; k < numSlides; k++) {
			if(k == targetIndex || k == activeIndex) {slides[k].style.opacity = 1;}
			else {slides[k].style.opacity = 0;}
		}

		// Setting active slide
		// Want to keep half slides to the left and half to the right for smooth transitions
		var currIndexI, currIndexJ;

		for(var i = targetIndex - Math.floor(halfNum); i < targetIndex; i++) {
			currIndexI = getInRange(i);
			slides[currIndexI].className = baseSlideClassName + " hide-left";
		}
		for(var j = targetIndex + Math.ceil(halfNum); j > targetIndex; j--) {
			currIndexJ = getInRange(j);
			slides[currIndexJ].className = baseSlideClassName + " hide-right";
		}
		slides[targetIndex].className = baseSlideClassName + " show";

		// Setting active dot
		for(var m = 0; m < dots.length; m++) {
			if(m == targetIndex) {
				dots[m].className = baseDotClassName + " active";
			} else {
				dots[m].className = baseDotClassName;
			}
		}

		activeIndex = targetIndex;

		// Remove this line if restart not desired.
		if(restart){restartAutoSlides();}
}

// This function restarts the slides' autoplay after some time with no clicks.
function restartAutoSlides() {
	window.clearTimeout(restartAutoSlidesTimeout);
	restartAutoSlidesTimeout = window.setTimeout(function(){
		autoChangeSlides = window.setInterval(changeSlides, frequency);
	},delay);
}

/* These event listeners could probably point to a single function, but I didn't want the animation check for the dots. */
leftArrow.addEventListener("click", function(){
	window.clearInterval(autoChangeSlides);
	if(slides[activeIndex].offsetLeft === 0) { /* Don't animate if slides are already animating */
		changeSlides(activeIndex - 1);
	}
});
rightArrow.addEventListener("click", function(){
	window.clearInterval(autoChangeSlides);
	if(slides[activeIndex].offsetLeft === 0) { /* Don't animate if slides are already animating */
		changeSlides(activeIndex + 1);
	}
});

function addELsToDots() {
	for(var i = 0, l = dots.length; i < l; i++) {
		(function(j){
			dots[j].addEventListener("click",function(e){
				var m;
				for(var k = 0; k < dots.length; k++) {
					if(e.target == dots[k]) {m = k;}
				}
				window.clearInterval(autoChangeSlides);
				changeSlides(m);
			});
		})(i);
	}
}
addELsToDots();

// Begin autoplay at start
autoChangeSlides = window.setInterval(changeSlides, frequency);










/* VIDEO FUNCTIONS */


var video = document.getElementById("buffalo-video"),
	playVideoLink = document.getElementById("play-video"),
	playImg = document.getElementById("paused-video-play-button"),
	videoPlaying = false;

//
function toggleVideoPlayState() {
	if(videoPlaying) {video.pause();}
	else {video.play();}
}

video.addEventListener("play", function(){
	playImg.style.display = "none";
	videoPlaying = !videoPlaying;
});
video.addEventListener("pause", function(){
	playImg.style.display = "initial";
	videoPlaying = !videoPlaying;
});

// To start playback
playVideoLink.addEventListener("click", function(e){

	e.preventDefault();

	playVideoLink.style.display = "none";
	video.style.cursor = "pointer";

	video.play();
	
	video.setAttribute("controls", "");

	// Adds playback toggle when click video. Firefox has this feature built in.
	if(browserName.toUpperCase() !== "Firefox".toUpperCase()) {
		video.addEventListener("click", toggleVideoPlayState);
	}
	playImg.addEventListener("click", toggleVideoPlayState);
	
	// Listen for video end
	video.addEventListener("ended", function(){
	
		video.style.cursor = "";

		video.removeEventListener("click", toggleVideoPlayState);
		playImg.removeEventListener("click", toggleVideoPlayState);

		video.removeAttribute("controls");
		
		// To reset video to beginning and display poster image
		video.load();
		
		playVideoLink.style.display = "";
		playImg.style.display = "none";
	
	});
});