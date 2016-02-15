/*  JavaScript for Smooth Page Transitions  */





/* ----- GENERAL FUNCTIONS ----- */

var Timbo = {

pareArray: function (clsNm) {
	var aAll = document.getElementsByClassName(clsNm);
	var aAbbr = [];
	for(var i = 0; i < aAll.length; i++) {
		if(aAll[i].nodeType == 1) {aAbbr.push(aAll[i]);}
	}
	return aAbbr;
},

addELsTo: function (arr,evt,fxn) {
	var al = arr.length;
	for(var i=0;i<al;i++) {
		(function(j){arr[j].addEventListener(evt,fxn);})(i);
	}
},

sendAjaxRequest: function (options) {

	if(options.url && options.type && options.success) {

		var opt = {

			// REQUIRED:
			url: options.url,
			type: options.type.toUpperCase(),
			success: options.success,

			// OPTIONAL:
			async: options.async || true,
			data: (function(){

				// Format this for request type.
				// Right now, to properly format for 'GET' only. Assume will be formatted correctly for other types.
				if(options.data) {
					if(opt.type == "GET") {
						if(typeof options.data == "string") {
							// To make sure GET query string does not start with '/' and does start with '?'
							while(options.data.search(/^\//i) != -1) {
								options.data = options.data.slice(1);
							}
							if(options.data.search(/^\?/i) != -1) {
								return options.data;
							}
						} else if(typeof options.data == "object") {
							// To accept object and format for query
							var q = "?", p;
							for(p in options.data) {
								q += p + "=" + options.data[p] + "&";
							}
							q = q.slice(0,-1);
							return q;
						}
						return "";
					}
					return options.data;
				}
				return "";

			})(),
			
			contentType: options.contentType || "application/x-www-form-urlencoded",
			error: options.error || function(){console.log("Ajax error: No data received");},
			statusCodeCallbacks: options.statusCodeCallbacks || undefined
		};

		console.log(opt);

		var xhr = (function() {
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
		})();

		// var xhr = ajaxRequest();

		xhr.open(opt.type, opt.url, opt.async);
		xhr.setRequestHeader("Content-type", opt.contentType);
		// xhr.setRequestHeader("Content-length", params.length);
		// xhr.setRequestHeader("Connection", "close");
		xhr.onreadystatechange = function() {
			if(this.readyState == 4){ // "request finished and response is ready"
				if(this.status == 200){ // "OK"
					if(this.responseText !== null){

						/* how to handle different types of return data...? */

						// var r = JSON.parse(this.responseText);

						opt.success(this.responseText);
					} else {opt.error();}
				} else {
					
					if(opt.statusCodeCallbacks) {
						// this.status.toString()?
						opt.statusCodeCallbacks[this.status]()
					} else {
						console.log("Ajax error: " + this.status + " - " + this.statusText);
					}
				}
			}
		};
		xhr.send(opt.data);
	}
}

};







/* ----- PAGE TRANSITION FUNCTIONS ----- */

var ptLinks = Timbo.pareArray("page-transition");
var container = document.getElementById("common-container");

function transitionPages(event) {
	event.preventDefault();
	var destination = event.target.getAttribute("href");
	console.log(destination);
	Timbo.sendAjaxRequest({
		url: destination,
		type: "GET",
		success: function(resp){
			console.log("response: " + resp);
		}
	});
}

Timbo.addELsTo(ptLinks,"click",transitionPages);











