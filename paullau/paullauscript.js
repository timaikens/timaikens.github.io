// JAVASCRIPT FOR paulingford.com


/* These are a little janky... Should work in this very basic case though */
/* textContent for major browsers and IE9+, innerText for IE8- */
function getTextOf(ele) {return ele.textContent || ele.innerText;}
function setTextOf(ele, to) {
	if("textContent" in ele) {ele.textContent = to;
	} else if("innerText" in ele) {ele.innerText = to;}
}


// SUBHEADING ANIMATION

var shToShow = [];

var shEle = document.getElementById("subhead-role"),
	shCursor = document.getElementById("subhead-role-spacer"),
	shArrCount = 0,
	shStrCount = 1,
	currentSHString = "";

/* subheading animation options */

var subheadings = [

"Amateur Adult",
"Cat Enthusiast",
"Professional Generalist",
"Former Kaleidoscope Jockey",  /* wraps at window width of 936px */
"Comic Book Artist",
"Unaccredited MMA Champion",
"Carbonara Admirer",
"Super Mario World Fan",
"Future BFF"

];

var finalSubheading = "Product Designer";

	/* speeds in milliseconds, lower is faster */
var writeSpeed = 100,
	eraseSpeed = 50,
	/* delays in milliseconds, lower is shorter */
	initialDelay = 2000,
	preWriteDelay = 1000,
	preEraseDelay = 2000,
	cursorFadeOutDelay = 1000,
	/* number of subheadings to show before the final subheading - set to subheadings.length or higher to show all */
	numberToShow = 1,
	/* infinitely looping  */
	infiniteLoop = false;

function createSHToShow() {

	var j, holder;

	if(numberToShow > subheadings.length) {numberToShow = subheadings.length;}

	for(var i = 0; i < numberToShow; i++) {

		j = Math.floor(Math.random() * subheadings.length);
		
		holder = subheadings.splice(j,1);
		shToShow.push(holder[0]);
	}
	if(finalSubheading) {shToShow.push(finalSubheading);}
}
createSHToShow();

function cursorFadeOut() {
	shCursor.className = "stopped";
}

function eraseSubhead() {

	if(shArrCount < shToShow.length - 1 || infiniteLoop){
		shStrCount--;
		currentSHString = getTextOf(shEle).slice(0,shStrCount);

		setTextOf(shEle,currentSHString);

		if(shStrCount > 0) {
			window.setTimeout(function(){eraseSubhead();}, eraseSpeed)
		} else {
			shEle.style.marginLeft = "-2px";  // To align cursor with header/name
			shArrCount++;
			window.setTimeout(initSHAnim, preWriteDelay);
		}
	} else {
		window.setTimeout(cursorFadeOut, cursorFadeOutDelay);
	}
}

function writeSubhead(str,strL) {

	currentSHString = str.slice(0,shStrCount);

	setTextOf(shEle,currentSHString);

	if(currentSHString.length < strL) {
		shStrCount++;
		window.setTimeout(function(){writeSubhead(str,strL)}, writeSpeed);
	} else {
		window.setTimeout(function(){eraseSubhead()}, preEraseDelay);
	}
}

function initSHAnim() {
	if(getTextOf(shEle).length != 0) {
		shStrCount = getTextOf(shEle).length;
		eraseSubhead();
	} else {
		if(shArrCount == shToShow.length) {shArrCount = 0;}
		shEle.style.marginLeft = "0";  // To align subheader with header/name
		writeSubhead(shToShow[shArrCount],shToShow[shArrCount].length);
	}
}

window.setTimeout(initSHAnim, initialDelay);


// SPOTIFY AND LAST.FM FETCHING

var stTitle = document.getElementById("spotify-track-title"),
	stArtist = document.getElementById("spotify-track-artist"),
	stTitleLink = document.getElementById("spotify-track-title-link"),
	stArtistLink = document.getElementById("spotify-track-artist-link"),
	defaultLinkURL = "https://open.spotify.com/";

function ajaxRequest() {
	var request;
	try {request = new XMLHttpRequest();} // non-IE
	catch(e1) {
		try {request = new ActiveXObject("Msxml2.XMLHTTP");} // IE 6+
		catch(e2) {
			try {request = new ActiveXObject("Microsoft.XMLHTTP");} // IE 5
			catch(e3) {
				request = false;
			}
		}
	}
	return request;
}


// SPOTIFY SEARCH FUNCTIONS FOR LINKS

function selectTrack(rObj, track, artist, album) {

	var n = rObj.tracks.items.length;
	
	for(var i = 0; i < n; i++) {

		var item = rObj.tracks.items[i],
			m = item.artists.length;
		
		// For song with multiple artists (Last.fm only returns first artist from Spotify)
		function ai(){
			for(var j = 0; j < m; j++){
				if(item.artists[j].name == artist){return true}
			}
			return false
		}

		var artistIncluded = ai();

		if(item.name == track && item.album.name == album && artistIncluded){
			return item;
		}
	}
	return false;
}

function createTrackLinks(trackObj, artist) {

	var trackURL = "",
		artistURL = "";

	function selectPrimaryArtist() {

		var n = trackObj.artists.length;

		for(var i = 0; i < n; i++) {
			if(trackObj.artists[i].name == artist) {
				artistURL = trackObj.artists[i].external_urls.spotify || ("https://open.spotify.com/artist/" + trackObj.artists[i].id);
			}
		}
		/* fallback in case artist name wasn't exactly matched in list - sends to first artist listed */
		if(!artistURL) {
			artistURL = trackObj.artists[0].external_urls.spotify || ("https://open.spotify.com/artist/" + trackObj.artists[0].id);
		}
	}

	if(trackObj) {
		trackURL = trackObj.external_urls.spotify || ("https://open.spotify.com/track/" + trackObj.id);
		selectPrimaryArtist();
	}

	if(!trackURL){trackURL = defaultLinkURL;}
	if(!artistURL){artistURL = defaultLinkURL;}

	stTitleLink.setAttribute("href", trackURL);
	stArtistLink.setAttribute("href", artistURL);
}

function searchSpotify(track, artist, album, type) {

	//   encodeURIComponent(uri);  --> to change spaces into %20 and special characters to respective

	var trE = encodeURIComponent(track),
		arE = encodeURIComponent(artist),
		alE = encodeURIComponent(album);

	if(!type){type="track";}

	var qString = "track:" + trE + "%20artist:" + arE + "%20album:" + alE;
	var spotifyRequestURL = "https://api.spotify.com/v1/search?q=" + qString + "&type=" + type;

	var request = ajaxRequest();

	request.open("GET", spotifyRequestURL, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// request.setRequestHeader("Content-length", params.length);
	// request.setRequestHeader("Connection", "close");
	request.onreadystatechange = function() {
		if(this.readyState == 4){ // "request finished and response is ready"
			if(this.status == 200){ // "OK"
				if(this.responseText !== null){

					var rObj = JSON.parse(this.responseText);

					var selectedTrack = selectTrack(rObj, track, artist, album);

					createTrackLinks(selectedTrack, artist);

				} else {console.log("Ajax error: No data received");}
			} else {console.log("Ajax error: " + this.status + " - " + this.statusText);}
		}
	};
	request.send();
}


// LAST.FM RECENT TRACKS FETCHING

function getRecentTracksFromLastFM() {

	var request = ajaxRequest();

	var userName = "paulingford",
		apiKey = "611563771428ec3ca3844da7812ff9b0";    // Tim's developer API key for Last.fm

	var lastRequestURL = "http://ws.audioscrobbler.com/2.0/?user=" + userName + "&method=user.getRecentTracks&api_key=" + apiKey + "&format=json";

	request.open("GET", lastRequestURL, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// request.setRequestHeader("Content-length", params.length);
	// request.setRequestHeader("Connection", "close");
	request.onreadystatechange = function() {
		if(this.readyState == 4){ // "request finished and response is ready"
			if(this.status == 200){ // "OK"
				if(this.responseText !== null){

					var rObj = JSON.parse(this.responseText);

					var trackName = rObj.recenttracks.track[0].name,
						trackArtist = rObj.recenttracks.track[0].artist['#text'],
						trackAlbum = rObj.recenttracks.track[0].album['#text'];

					if(getTextOf(stTitle) != trackName || getTextOf(stArtist) != trackArtist) {

						setTextOf(stTitle,trackName);
						setTextOf(stArtist,trackArtist);

						searchSpotify(trackName, trackArtist, trackAlbum, "track");
					}
				} else {console.log("Ajax error: No data received");}
			} else {console.log("Ajax error: " + this.status + " - " + this.statusText);}
		}
	};
	request.send();
}

getRecentTracksFromLastFM();

/* looks for a new track every 10 seconds - modify 10000 to change frequency */
var callLastFM = window.setInterval(getRecentTracksFromLastFM, 10000);

